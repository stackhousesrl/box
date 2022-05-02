
import { createSelector } from 'reselect';
import _get from 'lodash/get';
import _find from 'lodash/find';
import _findKey from 'lodash/findKey';
import _isFunction from 'lodash/isFunction';
import _join from 'lodash/join';
import _startsWith from 'lodash/startsWith';
import _isPlainObject from 'lodash/isPlainObject';
import _mapKeys from 'lodash/mapKeys';
import _mapValues from 'lodash/mapValues';
import checkRules, { getKeys } from '@stackhouseos/json-rules';
import { unflatten } from '../flat';
import { cleanPath, cleanPathHash, isImmutable } from '../utils';

const getStateData = state => isImmutable(state) ? state.toJS() : state;

const select = (state, extraData, name) => {
  const cleanedPath = cleanPath(name)
  const [reducer, ...rest] = cleanedPath.split('.');
  return isImmutable(state)
    ? _get(state.get(reducer), rest) ?? _get(extraData, rest)
    : _get(state, cleanedPath) ?? _get(extraData, cleanedPath);
};

const transformPrefix = (key, prefix) => {

  if (_startsWith(key, '^', 0)) {
    return key
  }
  if (_startsWith(key, '#', 0)) {
    return cleanPathHash(key, prefix)
  }
  return `^${key}`
}


export const chooseSelectorGlobalErrors = createSelector(
  getStateData,
  (state, extraData) => extraData,
  (state, b, c, d, prefix) => prefix,
  (state, b, c, d, p, checkAll) => checkAll,
  (state, b, c, flatIds) => flatIds,
  (data, extraData, prefix, checkAll, flatIds) => {
    if (Object.keys(flatIds).length === 0) return { hasError: false }
    const validation = generateValidationsObject(Object.entries(flatIds).filter(([k, v]) => !!v).map(([key, val]) => Object.assign({}, val, {
      id: transformPrefix(key, prefix)
    })));
    const [hasError, results] = checkRules(validation, Object.assign({}, data, extraData), false, { prefix, checkAll })
    return { hasError, results }
  }
);

export const selectorRulesDisabled = createSelector(
  getStateData,
  (state, extraData) => extraData,
  (a, b, rules) => rules,
  (a, b, rules, children, prefix) => prefix,
  chooseSelectorGlobalErrors,
  (a, b, rules, children, prefix, showAll, childId) => childId,
  (state, extraData, rules, prefix, hasGloablError, childId) => {
    const data = Object.assign({}, state, extraData, { hasError: hasGloablError.hasError, isValid: !hasGloablError.hasError, childId })
    const r = _isFunction(rules) ? rules(data) : rules;
    if (!r) return false
    const keys = getKeys(r, { prefix });
    if (!keys) return false
    const res = keys.reduce((acc, inc) => Object.assign(acc, { [inc]: _get(data, inc) }), {})
    const [disabled] = checkRules(r, Object.assign({}, unflatten(res)), false, { prefix })
    return disabled
  }
);

export const chooseSelectorByNode = createSelector(
  select,
  (data) => data
);

function mapKeysDeepLodash(obj, cb, isRecursive) {
  if (!obj && !isRecursive) {
    return {};
  }

  if (!isRecursive) {
    if (typeof obj === "string" || typeof obj === "number" || typeof obj === "boolean") {
      return {};
    }
  }

  if (Array.isArray(obj)) {
    return obj.map(item => mapKeysDeepLodash(item, cb, true));
  }

  if (!_isPlainObject(obj)) {
    return obj;
  }

  const result = _mapKeys(obj, cb);

  return _mapValues(result, value =>
    mapKeysDeepLodash(value, cb, true)
  );
};

const generateValidationsObject = (children, errorMessage = 'custom-error') => {
  return children.filter((e) => e.id && (e.pattern || e.required || e.validate))
    .map((inc) => ({
      and: [
        (inc.validate && _isFunction(inc.validate))
          ? ({ self: { func: inc.validate, name: errorMessage } })
          : (inc.validate && mapKeysDeepLodash(inc.validate, (v, key) => key === "self" ? inc.id : key)),
        inc.pattern && {
          [inc.id]: { re: inc.pattern },
        },
        inc.required && {
          [inc.id]: { ex: true, name: 'required' }, // todo intl
        },
      ].filter(Boolean),
    }));
}

export const chooseSelectorErrors = createSelector(
  getStateData,
  (state, extraData) => extraData,
  select,
  (a, b, childId) => childId,
  (a, b, c, child) => child,
  (a, b, c, d, prefix) => prefix,
  (state, extraData, childValue, childId, child, prefix) => {
    const validation = generateValidationsObject([Object.assign({}, child, {
      id: transformPrefix(childId, prefix)
    })]);
    const [error, results] = checkRules(validation, Object.assign({}, state, extraData, { self: childValue }), false, { prefix })
    return error && _join(results.length === 0 ? ['error'] : results, '|#|')
  }
);


const checkRule = (state, prefix, rule) => {
  const r = _isFunction(rule) ? rule(state) : rule;
  if (!r) return false
  const keys = getKeys(r, { prefix });
  if (!keys) return false
  const res = keys.reduce((acc, inc) => Object.assign(acc, { [inc]: _get(state, inc) }), {});
  const [valid] = checkRules(r, unflatten(res), true, { prefix })
  return valid
}

export const selectorRules = (keys, prefix) => {
  return createSelector(
    getStateData,
    (state, extraData) => extraData,
    (state, extraData) => {
      const data = Object.assign({}, state, extraData)

      if (Array.isArray(keys)) {
        const found = _find(keys, ({ rules }) => checkRule(data, prefix, rules))
        return found && found.value
      }

      if (typeof keys !== 'object') return keys;
      return _findKey(keys, (rule) => checkRule(data, prefix, rule))
    }
  )
}

import { createSelector } from 'reselect';
import _get from 'lodash/get';
import _find from 'lodash/find';
import _findKey from 'lodash/findKey';
import _isFunction from 'lodash/isFunction';
import _join from 'lodash/join';
import _startsWith from 'lodash/startsWith';
import checkRules, { getKeys } from '@stackhouseos/json-rules';
import { unflatten } from '../flat';
import { cleanPath, cleanPathHash, isImmutable } from '../utils';

const getStateData = state => isImmutable(state) ? state.toJS() : state;

const select = (state, extraData, name) => {
  const cleanedPath = cleanPath(name)
  const [reducer, ...rest] = cleanedPath.split('.');
  return isImmutable(state)
    ? _get(state.get(reducer), rest) ?? _get(extraData.get(reducer), rest)
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
  (state, b, c, fields) => fields,
  (state, b, c, d, prefix) => prefix,
  (data, extraData, fields, prefix) => {
    if (Object.keys(fields).length === 0) return false
    const validation = generateValidationsObject(Object.entries(fields).filter(([k, v]) => !!v).map(([key, val]) => Object.assign({}, val, {
      id: transformPrefix(key, prefix)
    })));
    const [error] = checkRules(validation, Object.assign({}, data, extraData), false, { prefix })
    return error
  }
);

export const selectorRulesDisabled = createSelector(
  getStateData,
  (state, extraData) => extraData,
  (a, b, rules) => rules,
  (a, b, rules, fields, prefix) => prefix,
  chooseSelectorGlobalErrors,
  (state, extraData, rules, prefix, hasError) => {
    const data = Object.assign({}, state, extraData, { hasError, isValid: !hasError })
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

const generateValidationsObject = (fields) => {
  return fields.filter((e) => e.id && (e.pattern || e.required || e.validate))
    .map((inc) => ({
      and: [
        inc.validate,
        inc.pattern && {
          [inc.id]: { re: inc.pattern },
        },
        inc.required && {
          [inc.id]: { ex: true, name: 'required' }, // todo intl
        },
      ].filter(Boolean),
    }));
}

// (state, contextProps, fieldId, field, prefix)
export const chooseSelectorErrors = createSelector(
  getStateData,
  (state, extraData) => extraData,
  select,
  (a, b, fieldId) => fieldId,
  (a, b, c, field) => field,
  (a, b, c, d, prefix) => prefix,
  (state, extraData, fieldValue, fieldId, field, prefix) => {
    const validation = generateValidationsObject([Object.assign({}, field, {
      id: transformPrefix(fieldId, prefix)
    })]);
    const [error, results] = checkRules(validation, Object.assign({}, state, extraData, { self: fieldValue }), false, { prefix })
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
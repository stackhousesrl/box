import React from 'react'
import _trimStart from 'lodash/trimStart';
import _omit from 'lodash/omit';
import _get from 'lodash/get';
import _isFunction from 'lodash/isFunction';
import EmptyContainer from '../components/empty';

export const isImmutable = obj => obj && (_isFunction(obj.asImmutable) && _isFunction(obj.get))

export const forceArray = (items) => Array.isArray(items) ? items : [items];

export const cleanPath = (name, char = '^') => _trimStart(name, char);
export const cleanPathHash = (name, prefix = '') => {
  const [reducer] = prefix.split('.')
  return reducer ? `^${reducer}.${_trimStart(name, '#')}` : _trimStart(name, '#')
}

export const select = () => (state, name) => {
  const [reducer, ...rest] = name.split('.')
  return isImmutable(state) ? _get(state.get(reducer), rest) : _get(state, name)
};

export const getPath = (prefix, prefixChildrenId, id, prefixFunc) => {
  const {
    prefix: prefixValue,
    prefixChildrenId: prefixChildrenIdValue,
    id: idValue
  } = prefixFunc ? prefixFunc(prefix, prefixChildrenId, id) : { prefix, prefixChildrenId, id }
  
  const res = [
    ...(prefixValue || '').split('.'),
    ...(prefixChildrenIdValue || '').split('.'),
    ...(idValue || '').split('.'),
  ].filter(Boolean);

  if ((idValue || '').indexOf('^') === 0) {
    return cleanPath(idValue);
  }

  if ((idValue || '').indexOf('#') === 0) {
    return cleanPathHash(idValue, prefixValue);
  }

  if ((prefixChildrenIdValue || '').indexOf('^') === 0) {
    return cleanPath(prefixChildrenIdValue);
  }

  if ((prefixChildrenIdValue || '').indexOf('#') === 0) {
    return cleanPathHash(prefixChildrenIdValue, prefixValue);
  }

  return res.join('.');
};

export const containerChildren = children => {
  if (!children) return null;
  // eslint-disable-next-line no-unused-vars
  return Object.entries(forceArray(children)).reduce((acc, [key, child]) => {
    const childChildren = containerChildren(child.children);
    const nextChild = {
      ..._omit(child, 'container'),
      children: childChildren,
      type: child.type || EmptyContainer
    };
    if (child.container) {
      const isReactCmp = Object.prototype.hasOwnProperty.call(child.container, '$$typeof')
      const node =
        typeof child.container === 'string'
          ? { type: child.container }
          : isReactCmp ? { type: child.container } : child.container;
      return [...acc, { ...node, children: [nextChild] }];
    }
    return [...acc, nextChild];
  }, []);
};

export const sortWithOrder = (object, order) => {
  if (!object) return object;
  if (!order) return Object.values(object);
  return [
    ...Object.values(object)
      .filter(({ key }) => order[key] !== undefined)
      .sort((a, b) => order[a.key] > order[b.key] ? +1 : -1),
    ...Object.values(object)
      .filter(({ key }) => order[key] === undefined)
  ]
}
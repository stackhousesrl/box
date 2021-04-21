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

export const getPath = (prefix, prefixFieldsId, id) => {
  const res = [
    ...(prefix || '').split('.'),
    ...(prefixFieldsId || '').split('.'),
    ...(id || '').split('.'),
  ].filter(Boolean);

  if ((id || '').indexOf('^') === 0) {
    return cleanPath(id);
  }

  if ((id || '').indexOf('#') === 0) {
    return cleanPathHash(id, prefix);
  }

  if ((prefixFieldsId || '').indexOf('^') === 0) {
    return cleanPath(prefixFieldsId);
  }

  if ((prefixFieldsId || '').indexOf('#') === 0) {
    return cleanPathHash(prefixFieldsId, prefix);
  }

  return res.join('.');
};

export const containerFields = fields => {
  if (!fields) return null;
  // eslint-disable-next-line no-unused-vars
  return Object.entries(forceArray(fields)).reduce((acc, [key, field]) => {
    const childFields = containerFields(field.fields);
    const nextField = {
      ..._omit(field, 'container'),
      fields: childFields,
      type: field.type || EmptyContainer
    };
    if (field.container) {
      const isReactCmp = Object.prototype.hasOwnProperty.call(field.container, '$$typeof')
      const node =
        typeof field.container === 'string'
          ? { type: field.container }
          : isReactCmp ? { type: field.container } : field.container;
      return [...acc, { ...node, fields: [nextField] }];
    }
    return [...acc, nextField];
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
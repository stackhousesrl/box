import produce from 'immer';
import _set from 'lodash/set';
import _unset from 'lodash/unset';

const reducer = (name, state = {}, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case `@box/${name}/update`:
        _set(draft, action.payload.id, action.payload.value);
        break;
  
      case `@box/${name}/reset`:
        _unset(draft, action.payload.id);
        break;

      default:
        return draft;
    }
  });

export default reducer;

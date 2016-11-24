import isEqual from 'lodash.isequal';

export function updateOnlyWhenStateChanges(update) {
  let lastState;

  function updateWrapper(state) {
    if (!isEqual(lastState, state)) {
      lastState = state;

      update(state);
    }
  }

  updateWrapper.getLastState = () => lastState;

  return updateWrapper;
}

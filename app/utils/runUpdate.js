import {runUpdateFunctions} from './runUpdateFunctions';

export function runUpdate(update, state) {
  if (Array.isArray(update)) {
    return runUpdateFunctions(update, state);
  }

  return update(state);
}

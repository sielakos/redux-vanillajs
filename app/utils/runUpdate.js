import {runUpdateFunctions} from './runUpdateFunctions';

export function runUpdate(update, state) {
  if (Array.isArray(update)) {
    return runUpdateFunctions(runUpdate, update, state);
  }

  if (update.update) {
    return runUpdate(update.update, state);
  }

  return update(state);
}

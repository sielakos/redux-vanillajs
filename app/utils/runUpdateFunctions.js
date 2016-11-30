import {flatten} from './flatten';

export function runUpdateFunctions(updateFunctions, state) {
  flatten(updateFunctions)
    .forEach(update => update(state));
}

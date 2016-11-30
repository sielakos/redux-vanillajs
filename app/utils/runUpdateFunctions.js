import {flatten} from './flatten';

export function runUpdateFunctions(runner, updateFunctions, state) {
  flatten(updateFunctions)
    .forEach(update => runner(update, state));
}

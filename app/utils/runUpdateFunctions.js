export function runUpdateFunctions(updateFunctions, state) {
  updateFunctions.forEach(update => update(state));
}

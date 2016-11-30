export function getDiagram(state, name) {
  if (state.diagrams[name]) {
    return state.diagrams[name].diagram;
  }
}

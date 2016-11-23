export const SELECT_DIAGRAM = 'SELECT_DIAGRAM';

export function reducer(state = {}, action) {
  switch (action.type) {
    case SELECT_DIAGRAM:
      return selectDiagram(state, action);
  }

  return state;
}

function selectDiagram(state, {name}) {
  return {
    ...state,
    name
  };
}

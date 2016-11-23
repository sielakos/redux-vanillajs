import diagram1 from './bpmn/diagram_1';
import diagram2 from './bpmn/diagram_2';
import diagram3 from './bpmn/diagram_3';

export const ADD_DIAGRAM = 'ADD_DIAGRAM';
export const REMOVE_DIAGRAM = 'REMOVE_DIAGRAM';
export const CHANGE_DIAGRAM_NAME = 'CHANGE_DIAGRAM_NAME';

export function reducer(
  state = {list: ['a', 'b', 'c'], diagrams: {a: diagram1, b: diagram2, c: diagram3}},
  action
) {
  switch (action.type) {
    case ADD_DIAGRAM:
      return addDiagram(state, action);
    case REMOVE_DIAGRAM:
      return removeDiagram(state, action);
    case CHANGE_DIAGRAM_NAME:
      return changeDiagramName(state, action);
  }

  return state;
}

function addDiagram({list, diagrams, ...rest}, {name, diagram}) {
  return {
    list: list.concat(name),
    diagrams: {
      [name]: diagram,
      ...diagrams
    },
    ...rest
  };
}

function removeDiagram({list, diagrams, ...rest}, {name}) {
  const newDiagrams = Object
    .keys(diagrams)
    .reduce((newDiagrams, key) => {
      if (key !== name) {
        newDiagrams[key] = diagrams[key];
      }

      return newDiagrams;
    }, {});

  return {
    list: list.filter(other => other !== name),
    diagrams: newDiagrams,
    ...rest
  };
}

function changeDiagramName({list, diagrams, ...rest}, {previousName, newName}) {
  const newDiagrams = Object
    .keys(diagrams)
    .reduce((newDiagrams, key) => {
      if (key !== name) {
        newDiagrams[key] = diagrams[key];
      } else {
        newDiagrams[newName] = diagrams[previousName];
      }

      return newDiagrams;
    }, {});

  return {
    list: list.map(name => name === previousName ? newName : name),
    diagrams: newDiagrams,
    ...rest
  };
}

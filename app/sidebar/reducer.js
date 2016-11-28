import diagram1 from 'bpmn/diagram_1.bpmn';
import diagram2 from 'bpmn/diagram_2.bpmn';
import diagram6 from 'bpmn/diagram_6.bpmn';
import {reducer as itemReducer, CHANGE_DIAGRAM_NAME, EDIT_SIDEBAR_ITEM} from './item';
import {CLEAR_ALL} from './clearAll';

export const ADD_DIAGRAM = 'ADD_DIAGRAM';
export const REMOVE_DIAGRAM = 'REMOVE_DIAGRAM';
export const SEARCH_DIAGRAMS = 'SEARCH_DIAGRAMS';

const defaultState = {
  list: ['a', 'b', 'c'],
  displayList: ['a', 'b', 'c'],
  diagrams: {
    a: {
      diagram: diagram1
    },
    b: {
      diagram: diagram2
    },
    c: {
      diagram: diagram6
    }
  }
};

export function reducer(
  state = defaultState,
  action
) {
  switch (action.type) {
    case ADD_DIAGRAM:
      return addDiagram(state, action);
    case REMOVE_DIAGRAM:
      return removeDiagram(state, action);
    case CHANGE_DIAGRAM_NAME:
      return changeDiagramName(state, action);
    case EDIT_SIDEBAR_ITEM:
      return editItemName(state, action);
    case CLEAR_ALL:
      return clearAll(state);
    case SEARCH_DIAGRAMS:
      return searchDiagrams(state, action);
  }

  return state;
}

function addDiagram({list, diagrams, ...rest}, {name, diagram}) {
  return updateDisplayList({
    list: list.concat(name),
    diagrams: {
      [name]: {
        edit: false,
        diagram: diagram
      },
      ...diagrams
    },
    ...rest
  });
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

  return updateDisplayList({
    list: list.filter(other => other !== name),
    diagrams: newDiagrams,
    ...rest
  });
}

function changeDiagramName({list, diagrams, ...rest}, action) {
  const {previousName, newName} = action;

  const newDiagrams = Object
    .keys(diagrams)
    .reduce((newDiagrams, key) => {
      if (key !== previousName) {
        newDiagrams[key] = diagrams[key];
      } else {
        newDiagrams[newName] = itemReducer(diagrams[previousName], action);
      }

      return newDiagrams;
    }, {});

  return updateDisplayList({
    list: list.map(name => name === previousName ? newName : name),
    diagrams: newDiagrams,
    ...rest
  });
}

function editItemName({diagrams, ...rest}, action) {
  const {name} = action;
  const newDiagrams = Object
    .keys(diagrams)
    .reduce((newDiagrams, key) => {
      if (key === name)  {
        newDiagrams[name] = itemReducer(diagrams[name], action);
      } else {
        newDiagrams[key] = diagrams[key];
      }

      return newDiagrams;
    }, {});

  return {
    ...rest,
    diagrams: newDiagrams
  };
}

function clearAll({diagrams, list, ...rest}) {
  return {
    diagrams: {},
    list: [],
    displayList: [],
    ...rest
  };
}

function searchDiagrams({list, ...rest}, {search}) {
  return {
    ...rest,
    search,
    list,
    displayList: getDisplayList(list, search)
  };
}

function updateDisplayList({list, search, ...rest}) {
  return {
    ...rest,
    list,
    search,
    displayList: getDisplayList(list, search)
  }
}

function getDisplayList(list, search) {
  if (!search) {
    return list;
  }

  return list.filter((name) => name.indexOf(search) >= 0);
}

export function createAddDiagramAction(name, diagram) {
  return {
    type: ADD_DIAGRAM,
    name,
    diagram
  };
}

export function createSearchAction(search) {
  return {
    type: SEARCH_DIAGRAMS,
    search
  };
}

import {connect, list, compileTemplate, get, pipe} from 'utils';
import {component as itemComponent} from './item';
import {component as clearAllComponent} from './clearAll';
import {component as randomGeneratorComponent} from './randomGenerator';
import {createAddDiagramAction, createSearchAction} from './reducer';
import {component as searchComponent} from './search';

const addRandom = randomGeneratorComponent(({name, diagram}) =>
  createAddDiagramAction(name, diagram)
);

const diagramList = connect(
  'list',
  list(itemComponent, {
    key: 'name'
  })
);

const createComponent = compileTemplate`
  <div class="clear-all">${clearAllComponent}</div>
  <div class="add-random">${addRandom}</div>
  <div class="search">${searchComponent(createSearchAction)}</div>
  <ul class="list">
    <li class="sidebar-item">${diagramList}</li>
  </ul>
`;

function getProperties({displayList, diagrams, ...rest}) {
  return {
    ...rest,
    list: displayList.map(name => ({
      ...diagrams[name],
      name
    }))
  };
}

export const component = connect(
  getProperties,
  createComponent,
);



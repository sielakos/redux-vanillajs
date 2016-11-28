import {connect, list, compileTemplate, get, pipe} from 'utils';
import {component as itemComponent} from './item';
import {component as clearAllComponent} from './clearAll';
import {component as randomGeneratorComponent} from './randomGenerator';
import {createAddDiagramAction} from './reducer';

const addRandom = randomGeneratorComponent(({name, diagram}) =>
  createAddDiagramAction(name, diagram)
);

const diagramList = connect(
  'list',
  list(itemComponent, {
    tag: 'li',
    key: 'name'
  })
);

const createComponent = compileTemplate`
  <div class="clear-all">${clearAllComponent}</div>
  <div class="add-random">${addRandom}</div>
  <ul class="list">${diagramList}</ul>
`;

function getProperties({list, diagrams}) {
  return {
    list: list.map(name => ({
      ...diagrams[name],
      name
    }))
  };
}

export const component = connect(
  getProperties,
  createComponent,
);



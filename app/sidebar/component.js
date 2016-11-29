import {connect, list, jsx, get, pipe} from 'utils';
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

const createComponent = (<div>
  Some text: <br />
  <div className="clear-all">{clearAllComponent}</div>
  <div className="add-random">{addRandom}</div>
  <div className="search">{searchComponent(createSearchAction)}</div>
  <ul className="list">
    <li className="sidebar-item">{diagramList}</li>
  </ul>
</div>);


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



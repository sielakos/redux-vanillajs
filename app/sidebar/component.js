import {List, jsx, get, pipe, JsxConnect} from 'utils';
import {component as ItemComponent} from './item';
import {component as ClearAllComponent} from './clearAll';
import {component as RandomGeneratorComponent} from './randomGenerator';
import {createAddDiagramAction, createSearchAction} from './reducer';
import {component as SearchComponent} from './search';

const SidebarComponent = (<div>
  Some text: <br />
  <ClearAllComponent />
  <div className="add-random">
    <RandomGeneratorComponent createAddDiagramAction={({name, diagram}) => createAddDiagramAction(name, diagram)}  />
  </div>
  <div className="search"><SearchComponent createSearchAction={createSearchAction} /></div>
  <ul className="list">
    <JsxConnect selector="list">
      <List key="name" onlyChild={true}>
        <ItemComponent />
      </List>
    </JsxConnect>
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

export const component = (<JsxConnect selector={getProperties}>
  <SidebarComponent/>
</JsxConnect>);


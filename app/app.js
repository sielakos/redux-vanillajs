import 'styles.scss';

import {createStore} from 'redux';
import {reducer, component} from 'main';
import {ACTION_EVENT_NAME} from 'actionEventName';
import {runUpdate, createEventsBus} from 'utils';

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const eventsBus = createEventsBus();
const updateComponent = runUpdate.bind(
  null,
  component(
    document.getElementById('app'),
    eventsBus
  )
);

updateComponent(store.getState());

let count = 0;

store.subscribe(() => {
  const state = store.getState();

  //In timeout to avoid infinite loop when using dispatch
  setTimeout(updateComponent.bind(null, state), 0);

  eventsBus.fireEvent('update-count', {count: ++count});
});

document.addEventListener(ACTION_EVENT_NAME, ({reduxAction}) => {
  store.dispatch(reduxAction);
});

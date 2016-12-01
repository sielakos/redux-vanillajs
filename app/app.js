import 'styles.scss';

// import {createStore} from 'redux';
import {reducer, component} from 'main';
import {ACTION_EVENT_NAME} from 'actionEventName';
import {runUpdate, createEventsBus} from 'utils';

const eventsBus = createEventsBus();
const updateComponent = runUpdate.bind(
  null,
  component(
    document.getElementById('app'),
    eventsBus
  )
);

// const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const createStore = (reducer, callback) => {
  let state = reducer(undefined, {
    type: '@@INIT'
  });

  return {
    dispatch: (action) => {
      state = reducer(state, action);
      callback(state);
    },
    getState: () => state
  };
};

let count = 0;
const store = createStore(reducer, () => {
  const state = store.getState();

  //In timeout to avoid infinite loop when using dispatch
  setTimeout(updateComponent.bind(null, state), 0);

  eventsBus.fireEvent('update-count', {count: ++count});
});

updateComponent(store.getState());

document.addEventListener(ACTION_EVENT_NAME, ({reduxAction}) => {
  store.dispatch(reduxAction);
});

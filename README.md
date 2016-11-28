# redux-vanillajs

Playground repository for experimenting with component based architecture without any viewer library.
Furthermore this view layer is integrated with redux for state managament.

[![Build Status](https://travis-ci.org/sielakos/redux-vanillajs.svg?branch=master)](https://travis-ci.org/sielakos/redux-vanillajs)

## Component architecture with plain javascript

Basically component is just a function that takes DOM node and returns update function that should be called 
when state has changed.

For example simple component that displays name from state

```javascript
const component = (node) => {
    node.innerHTML = `
      Name: <strong class="name"></strong>
    `;
    
    const nameElement = node.querySelector('.name');
    
    return ({name}) => nameElement.innerHTML = name; 
}
```

Components written like this can be composed and reused with plain javascript.
But to makes life simpler few helper functions can be used. 
In this repository the examples of such function can be found inside ``app/utils``

As for integration with redux it is also quite simple.
Just initialize main component and call its update function when state changes. 
You might want to wrap update function in ``setTimeout`` to avoid possible 
infinite loops if state update can result in action being fired. 
 
Redux action can be passed to store via custom dom event fired on ``document``.

```javascript
const actionEvent = new Event(ACTION_EVENT_NAME);

actionEvent.reduxAction = action;

document.dispatchEvent(actionEvent);
```

Then just simple add listener and pass action to state.

```javascript
document.addEventListener(ACTION_EVENT_NAME, ({reduxAction}) => {
  store.dispatch(reduxAction);
});
```

With this explicit passing of dispatch function can be avoided 
and there is no need to use event bus of any sort.

## Running development server

```
npm run serve
```

And open [http://localhost:9000](http://localhost:9000) in browser

## Production compilation

```
npm run compile
```

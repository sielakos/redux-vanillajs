import {pipe} from './pipe';
import {get} from './get';
import {addChildren} from './jsx';
import {runUpdate} from './runUpdate';

export function connect(getProperties, component) {
  if (typeof getProperties === 'string') {
    return connect(get.bind(null, getProperties), component);
  }

  return (node, eventsBus) => {
    const updateComponent = runUpdate.bind(
      null,
      component(node, eventsBus)
    );

    return pipe(getProperties, updateComponent);
  };
}

//JSX compatible version of connect
export function JsxConnect({selector, children}) {
  if (typeof selector === 'string') {
    return JsxConnect({
      selector: get.bind(null, selector),
      children
    });
  }

  return (node, eventsBus) => {
    const updateFunctions = addChildren(node, eventsBus, children);

    return pipe(
      selector,
      runUpdate.bind(null, updateFunctions)
    );
  };
}
JsxConnect.composable = true;

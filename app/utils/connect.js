import {pipe} from './pipe';
import {get} from './get';
import {addChildren} from './jsx';
import {runUpdate} from './runUpdate';

export function connect(getProperties, component) {
  if (typeof getProperties === 'string') {
    return connect(get.bind(null, getProperties), component);
  }

  return node => {
    const updateComponent = runUpdate.bind(
      null,
      component(node)
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

  return (node) => {
    const updateFunctions = addChildren(node, children);

    return pipe(
      selector,
      runUpdate.bind(null, updateFunctions)
    );
  };
}
JsxConnect.composable = true;

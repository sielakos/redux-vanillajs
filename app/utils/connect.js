import {pipe} from './pipe';
import {get} from './get';
import {runUpdateFunctions} from './runUpdateFunctions';
import {addChild} from './jsx';

export function connect(getProperties, component) {
  if (typeof getProperties === 'string') {
    return connect(get.bind(null, getProperties), component);
  }

  return node => {
    const updateComponent = component(node);

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
    const updateFunctions = children.map(addChild.bind(null, node));

    return pipe(
      selector,
      runUpdateFunctions.bind(null, updateFunctions)
    );
  };
}
JsxConnect.composable = true;

import {pipe} from './pipe';
import {get} from './get';

export function connect(getProperties, component) {
  if (typeof getProperties === 'string') {
    return connect(get.bind(null, getProperties), component);
  }

  return node => {
    const updateComponent = component(node);

    return pipe(getProperties, updateComponent);
  };
}

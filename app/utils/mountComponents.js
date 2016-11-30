import {pipe} from './pipe';
import {createEventsBus} from './events';

export function mountComponents(parentNode, eventsBus, mountPoints) {
  const addComponent = pipe(
    getNodeForTarget.bind(null, parentNode),
    mountComponent.bind(null, eventsBus)
  );

  return mountPoints.reduce((updates, mountPoint) => {
    return updates.concat(addComponent(mountPoint));
  }, []);
}

function getNodeForTarget(parentNode, {target, ...rest}) {
  if (typeof target === 'string') {
    return {
      node: parentNode.querySelector(target),
      ...rest
    };
  }

  return {
    node: target,
    ...rest
  };
}

function mountComponent(eventBus, {component, node}) {
  return component(node, createEventsBus(eventBus));
}

import {pipe} from './pipe';

export function mountComponents(parentNode, mountPoints) {
  const addComponent = pipe(
    getNodeForTarget.bind(null, parentNode),
    mountComponent
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

function mountComponent({component, node}) {
  return component(node);
}

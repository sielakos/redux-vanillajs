import {runUpdateFunctions} from './runUpdateFunctions';
import {pipe} from './pipe';

export function mountComponents(parentNode, mountPoints) {
  const updateFunctions = mountPoints.map(pipe(
    getNodeForTarget.bind(null, parentNode),
    mountComponent
  ));

  return runUpdateFunctions.bind(null, updateFunctions);
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

import {pipe} from './pipe';
import {$document} from 'dom';

export function list(component, {tag = 'div', key}) {
  return (node) => {
    let lastChildren = {};

    return (values) => {
      const withNodes = values.map(
        pipe(
          wrapWithKey.bind(null, key),
          addNodeAndUpdate.bind(
            null,
            lastChildren,
            getNewNode.bind(null, node, tag, component)
          )
        )
      );

      lastChildren = render(node, withNodes);
    };
  };
}

function wrapWithKey(keyProperty, value, index) {
  if (!keyProperty) {
    return {
      key: index,
      value: value
    };
  }

  return {
    key: value[keyProperty],
    value: value
  };
}

function addNodeAndUpdate(children, getNewNode, {key, value}) {
  const {node, update} = children[key] || getNewNode();

  return {
    key,
    value,
    node,
    update
  };
}

function getNewNode(parentNode, tag, component) {
  const node = $document.createElement(tag);
  const update = component(node);

  parentNode.appendChild(node);

  return {
    node,
    update
  }
}

function render(parentNode, withNodes) {
  parentNode.innerHTML = '';

  withNodes.forEach(({node, value, update}) => {
    parentNode.appendChild(node);
    update(value);
  });

  return withNodes.reduce((children, {key, ...rest}) => {
    return {
      ...children,
      [key]: rest
    };
  }, {});
};

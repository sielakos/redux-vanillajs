import {includes} from './includes';
import {$document} from 'dom';

export function list(component, {key}) {
  return (templateNode) => {
    let nodes = [];
    let parent = templateNode.parentNode;
    const startMarker = $document.createComment('LIST START');

    parent.insertBefore(startMarker, templateNode);
    parent.removeChild(templateNode);

    return (values) => {
      const valuesWithKey = values.map(
        wrapWithKey.bind(null, key)
      );

      assertKeysAreUnique(valuesWithKey);

      nodes = render(
        startMarker,
        nodes,
        valuesWithKey,
        getNewNode.bind(null, templateNode, component)
      );
    };
  };
}

function assertKeysAreUnique(valuesWithKey) {
  const keys = valuesWithKey.map(({key}) => key);

  for (let key; keys.length > 0; key = keys.shift()) {
    if (includes(keys, key)) {
      throw new Error(`key ${key} is not unique`);
    }
  }
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

function getNewNode(templateNode, component) {
  const node = templateNode.cloneNode(true);
  const update = component(node);

  return {
    node,
    update
  }
}

function render(startMarker, nodes, valuesWithKey, getNewNode) {
  removeNodes(nodes);

  return insertValueNodes(startMarker, nodes, valuesWithKey, getNewNode);
}

function removeNodes(nodes) {
  nodes.forEach(({node}) => node.parentNode.removeChild(node));
}

function insertValueNodes(startMarker, nodes, valuesWithKey, getNewNode) {
  const {updated, notUsed} = splitNodes(nodes, valuesWithKey);
  const startValue = {
    nodes: [],
    previous: startMarker
  };

  const {nodes: newNodes} = valuesWithKey.reduce(({nodes, previous}, {key, value}) => {
    const {node, update} = getNextNode(key);

    insertAfter(node, previous);

    update(value);

    nodes.push({
      node,
      update,
      key
    });

    return {
      nodes,
      previous: node
    };
  }, startValue);

  return newNodes;

  function getNextNode(key) {
    return updated[key] || notUsed.shift() || getNewNode();
  }
}

function splitNodes(nodes, valuesWithKey) {
  const startValue = {
    updated: {},
    notUsed: []
  };
  const valuesKeys = valuesWithKey.map(({key}) => key);

  return nodes
    .reduce(({updated, notUsed}, nodeEntry) => {
      if (nodeEntry.key && includes(valuesKeys, nodeEntry.key)) {
        updated[nodeEntry.key] = nodeEntry;
      } else {
        notUsed.push(nodeEntry);
      }

      return {updated, notUsed};
    }, startValue);
}

function insertAfter(node, target) {
  target.parentNode.insertBefore(node, target.nextSibling);
}


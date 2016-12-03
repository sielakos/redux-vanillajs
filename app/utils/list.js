import {includes} from './includes';
import {addChildren} from './jsx';
import {runUpdate} from './runUpdate';
import {DESTROY_EVENT} from './events';
import {$document} from 'dom';

export function List({onlyChild = false, key, children}) {
  return (templateNode, eventsBus) => {
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
        getNewNode.bind(null, templateNode, eventsBus, children),
        onlyChild ? parent : null
      );
    };
  };
}
List.composable = true;

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

function getNewNode(templateNode, eventsBus, children) {
  const node = templateNode.cloneNode(true);
  const updates = addChildren(node, eventsBus, children, true);
  const update = runUpdate.bind(
    null,
    updates
  );

  return {
    node,
    update,
    fireEvent: fireEvent.bind(null, updates)
  };
}

function fireEvent(updates, name, data) {
  updates
    .forEach(({eventsBus}) => {
      eventsBus.fireEvent(name, data);
    });
}

function render(startMarker, nodes, valuesWithKey, getNewNode, parent) {
  if (nodes.length) {
    removeNodes(nodes, parent);
  }

  return insertValueNodes(startMarker, nodes, valuesWithKey, getNewNode, parent);
}

function removeNodes(nodes, parent) {
  if (!parent) {
    nodes.forEach(({node}) => node.parentNode.removeChild(node));
  } else {
    parent.innerHTML = '';
  }
}

function insertValueNodes(startMarker, nodes, valuesWithKey, getNewNode, parent) {
  const notUsed = splitNodes(nodes, valuesWithKey);

  const fragment = document.createDocumentFragment();

  const newNodes = valuesWithKey.map(({node: updatedNode, key, value}) => {
    const {node, update, ...rest} = updatedNode || getNextNode();

    fragment.appendChild(node);

    return {
      ...rest,
      node,
      update,
      value,
      key
    };
  });

  if (parent) {
    parent.appendChild(fragment);
  } else {
    insertAfter(fragment, startMarker);
  }

  newNodes.forEach(({update, value}) => {
    update(value);
  });

  fireDestroyEventForNotUsed(notUsed);

  return newNodes;

  function getNextNode() {
    return notUsed.shift() || getNewNode();
  }
}

function fireDestroyEventForNotUsed(notUsed) {
  notUsed.forEach(({fireEvent}) => fireEvent(DESTROY_EVENT, {}))
}

function splitNodes(nodes, valuesWithKey) {
  const nodesByKey = nodes.reduce((nodesByKey, node) => {
    nodesByKey[node.key] = node;

    return nodesByKey;
  }, {});

  valuesWithKey
    .forEach(valueWithKey => {
      valueWithKey.node = nodesByKey[valueWithKey.key];
      delete nodesByKey[valueWithKey.key];
    });

  return Object
    .keys(nodesByKey)
    .map(key => nodesByKey[key]);
}

function insertAfter(node, target) {
  target.parentNode.insertBefore(node, target.nextSibling);
}

import {createEventsBus} from './events';

export function jsx(element, attributes, ...children) {
  if (typeof element === 'function') {
    return handleComponent(element, attributes, children)
  }

  return handleHtml(element, attributes, children);
}

function handleComponent(component, attributes, children) {
  if (component.composable) {
    return component({
      ...attributes,
      children
    });
  }

  // In this case components ignores attributes and children
  return component;
}

function handleHtml(element, attributes, children) {
  return (node, eventsBus) => {
    const elementNode = document.createElement(element);

    node.appendChild(elementNode);

    return setAttributes(elementNode, eventsBus, attributes)
      .concat(
        addChildren(elementNode, eventsBus, children)
      );
  };
}

function setAttributes(elementNode, eventsBus, attributes) {
  if (!attributes) {
    return [];
  }

  return Object
    .keys(attributes)
    .reduce((updates, attribute) => {
      const value = attributes[attribute];

      if (typeof value === 'function') { // attribute component
        return updates.concat(value(elementNode, createEventsBus(eventsBus)));
      }

      setAttribute(elementNode, attribute, value);

      return updates;
    }, []);
}

function setAttribute(elementNode, attribute, value) {
  if (attribute === 'className') {
    return elementNode.setAttribute('class', value);
  }

  elementNode.setAttribute(attribute, value);
}

export function addChildren(elementNode, eventsBus, children, addChildEventsBus) {
  return children.reduce((updates, child) => {
    return updates.concat(addChild(elementNode, eventsBus, child, addChildEventsBus));
  }, []);
}

export function addChild(elementNode, eventsBus, child, addChildEventsBus) {
  if (typeof child === 'string') {
    elementNode.appendChild(
      document.createTextNode(child)
    );

    return [];
  }

  const childEventBus = createEventsBus(eventsBus);
  const update = child(elementNode, childEventBus);

  if (!addChildEventsBus) {
    return update;
  }

  return {
    update,
    eventsBus: childEventBus
  };
}

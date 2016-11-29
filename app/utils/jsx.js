import {runUpdateFunctions} from './runUpdateFunctions';
import {noop} from './noop';

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
  const elementNode = document.createElement(element);

  setAttributes(elementNode, attributes);

  return (node) => {
    node.appendChild(elementNode);

    if (children.length === 0) {
      return noop;
    }

    const updateFunctions = children.map(addChild.bind(null, elementNode));

    return runUpdateFunctions.bind(null, updateFunctions);
  };
}

function setAttributes(elementNode, attributes) {
  if (!attributes) {
    return;
  }

  Object
    .keys(attributes)
    .forEach(attribute => {
      const value = attributes[attribute];

      if (typeof value === 'function') { // attribute component
        return value(elementNode);
      }

      setAttribute(elementNode, attribute, value);
    });
}

function setAttribute(elementNode, attribute, value) {
  if (attribute === 'className') {
    return elementNode.setAttribute('class', value);
  }

  elementNode.setAttribute(attribute, value);
}

function addChild(elementNode, child) {
  if (typeof child === 'string') {
    elementNode.appendChild(
      document.createTextNode(child)
    );

    return noop;
  }

  return child(elementNode);
}

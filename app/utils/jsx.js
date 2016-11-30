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

  return (node) => {
    node.appendChild(elementNode);

    return setAttributes(elementNode, attributes)
      .concat(
        addChildren(elementNode, children)
      );
  };
}

function setAttributes(elementNode, attributes) {
  if (!attributes) {
    return [];
  }

  return Object
    .keys(attributes)
    .reduce((updates, attribute) => {
      const value = attributes[attribute];

      if (typeof value === 'function') { // attribute component
        return updates.concat(value(elementNode));
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

export function addChildren(elementNode, children) {
  return children.reduce((updates, child) => {
    return updates.concat(addChild(elementNode, child));
  }, []);
}

export function addChild(elementNode, child) {
  if (typeof child === 'string') {
    elementNode.appendChild(
      document.createTextNode(child)
    );

    return [];
  }

  return child(elementNode);
}

import {mountComponents} from './mountComponents';

export function compileTemplate(templateParts, ...components) {
  const placeholders = createPlaceholders(components);
  const html = createHtml(templateParts, placeholders);

  return (node) => {
    node.innerHTML = html;

    return mountComponents(node, createMountPoints(node, placeholders));
  }
}

// Placeholder element will be removed if parent element has only one child
function createPlaceholders(components) {
  return components
    .map(component => ({
      name: `placeholder-${Math.round(Math.random() * 100000000000)}`,
      component
    }));
}

function createHtml(templateParts, placeholders) {
  return templateParts
    .slice(1)
    .reduce((html, part, index) => {
      return `${html}<span id="${placeholders[index].name}"></span>${part}`;
    }, templateParts[0]);
}

function createMountPoints(node, placeholders) {
  return placeholders.map(({name, component}) => ({
    target: getTarget(node, name),
    component
  }));
}

// If possible remove placeholder and return parent as target
function getTarget(node, name) {
  const target = node.querySelector(`#${name}`);
  const parent = target.parentElement;
  const count = parent.childElementCount;

  if (count === 1) {
    parent.innerHTML = '';

    return parent;
  }

  return target;
}

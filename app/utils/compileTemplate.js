import {mountComponents} from './mountComponents';

export function compileTemplate(templateParts, ...components) {
  const placeholders = createPlaceholders(components);
  const html = createHtml(templateParts, placeholders);

  return (node) => {
    node.innerHTML = html;

    return mountComponents(node, createMountPoints(placeholders));
  }
}

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

function createMountPoints(placeholders) {
  return placeholders.map(({name, component}) => ({
    target: `#${name}`,
    component
  }));
}

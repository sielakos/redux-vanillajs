export function attribute(component, name) {
  component.attribute = `component-${name || Math.round(100000000 * Math.random())}`;
  component.component = component;

  return component;
}

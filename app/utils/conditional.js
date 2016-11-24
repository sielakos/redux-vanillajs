import {updateOnlyWhenStateChanges} from './updateOnlyWhenStateChanges';
import {noop} from './noop';

const emptyLastUsed = {
  component: undefined,
  update: noop
};

export function conditional(conditionEntries) {
  let lastUsed = emptyLastUsed;

  return (node) => {
    return updateOnlyWhenStateChanges((state) => {
      const component = getComponent(conditionEntries, state);

      if (!component) {
        lastUsed = clearComponent(node);
      } else if (shouldChangeLastUsedComponent(lastUsed, component)) {
        lastUsed = updateLastUsed(component, node);
      }

      lastUsed.update(state);
    });
  }
}

function getComponent(conditionEntries, state) {
  const selectedEntry = conditionEntries
    .filter(({predicate}) => predicate(state))[0];

  return selectedEntry && selectedEntry.component;
}

function clearComponent(node) {
  node.innerHTML = '';

  return emptyLastUsed;
}

function shouldChangeLastUsedComponent(lastUsed, component) {
  return !lastUsed.component || component !== lastUsed.component;
}

function updateLastUsed(component, node) {
  return {
    component,
    update: component(node)
  };
}

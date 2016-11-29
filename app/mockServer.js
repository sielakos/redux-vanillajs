import {pipe} from 'utils';

export function getList() {
  return getFromStoreAndDelay('list')
    .then(JSON.parse);
}

export const getDiagram = pipe(
  getDiagramItemName,
  getFromStoreAndDelay
);

export function saveDiagram({name, diagram}) {
  return new Promise((resolve) => {
    const list = JSON.parse(
      localStorage.getItem('list')
    ) || [];

    list.push(name);
    localStorage.setItem(
      'list',
      JSON.stringify(list)
    );

    localStorage.setItem(
      getDiagramItemName(name),
      diagram
    );

    resolve(true);
  });
}

function getDiagramItemName(name) {
  return `_diagram-${name}`;
}

function getFromStoreAndDelay(item) {
  return new Promise((resolve) => {
    pipe(
      localStorage.getItem.bind(localStorage),
      delay(resolve)
    )(item);
  });
}

function delay(resolve) {
  return (...args) => {
    setTimeout(() => resolve(args), 2000);
  }
}

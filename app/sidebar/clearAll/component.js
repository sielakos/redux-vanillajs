import {conditional, dispatchAction, noop} from 'utils';

export const CLEAR_ALL = 'CLEAR_ALL';

const template = `
  <button class="clear-all-btn" type="button">clear all</button>
`;

function createComponent(node) {
  node.innerHTML = template;

  const clearAllBtn = node.querySelector('.clear-all-btn');

  clearAllBtn.addEventListener('click', dispatchAction.bind(null, {
    type: CLEAR_ALL
  }));

  return noop;
}

export const component = conditional([
  {
    predicate: ({list}) => list.length > 0,
    component: createComponent
  }
]);

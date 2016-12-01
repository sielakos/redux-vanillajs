import {jsx, DESTROY_EVENT} from 'utils';

const template = <span class="interval-counter">0</span>;

export function component(node, eventBus) {
  const update = template(node, eventBus);
  const counterElement = node.querySelector('.interval-counter');

  let count = 0;
  const id = setInterval(() => {
    counterElement.innerHTML = ++count;
  }, 1000);

  eventBus.on(DESTROY_EVENT, () => {
    clearInterval(id);
  });

  return update;
}

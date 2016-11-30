import {jsx} from 'utils';

const template = <span>
  Updates: <strong class="update-counter">0</strong>
</span>;

export function component(node, eventsBus) {
  const templateUpdate = template(node, eventsBus);

  const updateCounterElement = node.querySelector('.update-counter');

  eventsBus.on('update-count', (event) => {
    const {data: {count}} = event;

    updateCounterElement.innerHTML = count;
  });

  return templateUpdate;
}

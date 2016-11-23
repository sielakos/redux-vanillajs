import {addClass} from 'utils';
import {REMOVE_DIAGRAM} from '../reducer';
import {ACTION_EVENT_NAME} from 'actionEventName';

const template = `
  <a class="sidebar-item-name"></a>
  <button class="sidebar-item-remove" type="button">remove</button>
`;

export function component(node) {
  let lastName;

  node.innerHTML = template;
  addClass(node, 'sidebar-item');

  const nameElement = node.querySelector('.sidebar-item-name');
  const removeElement = node.querySelector('.sidebar-item-remove');

  removeElement.addEventListener('click', () => {
    const actionEvent = new Event(ACTION_EVENT_NAME);

    actionEvent.reduxAction = {
      type: REMOVE_DIAGRAM,
      name: lastName
    };

    document.dispatchEvent(actionEvent);
  });

  return ({name}) => {
    if (lastName !== name) {
      lastName = name;
      nameElement.innerHTML = name;
    }
  };
}

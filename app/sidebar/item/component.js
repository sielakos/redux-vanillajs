import {addClass, removeClass, dispatchAction} from 'utils';
import {REMOVE_DIAGRAM} from '../reducer';
import {CHANGE_DIAGRAM_NAME, EDIT_SIDEBAR_ITEM} from './reducer';
import {SELECT_DIAGRAM} from 'bpmnViewer';

const template = `
  <a class="sidebar-item-name"></a>
  <input class="sidebar-item-name-field hidden" type="text">
  <button class="sidebar-item-remove" type="button">remove</button>
  <button class="sidebar-item-rename" type="button">rename</button>
`;

export function component(node) {
  let lastName;
  let lastEdit;

  node.innerHTML = template;

  const nameElement = node.querySelector('.sidebar-item-name');
  const removeElement = node.querySelector('.sidebar-item-remove');
  const nameFieldElement = node.querySelector('.sidebar-item-name-field');
  const renameElement = node.querySelector('.sidebar-item-rename');

  removeElement.addEventListener('click', () => {
    dispatchAction({
      type: REMOVE_DIAGRAM,
      name: lastName
    });
  });

  nameElement.addEventListener('click', (event) => {
    event.preventDefault();

    dispatchAction({
      type: SELECT_DIAGRAM,
      name: lastName
    });
  });

  renameElement.addEventListener('click', () => {
    if (lastEdit) {
      const newName = nameFieldElement.value;

      dispatchAction({
        type: CHANGE_DIAGRAM_NAME,
        previousName: lastName,
        newName
      });
    } else {
      dispatchAction({
        type: EDIT_SIDEBAR_ITEM,
        name: lastName
      });
    }
  });

  return ({name, edit}) => {
    if (lastName !== name) {
      lastName = name;
      nameElement.innerHTML = name;
    }

    if (lastEdit !== edit) {
      lastEdit = edit;
      renameElement.innerHTML = edit ? 'save' : 'rename';

      if (edit) {
        removeClass(nameFieldElement, 'hidden');
        addClass(nameElement, 'hidden');
      } else {
        removeClass(nameElement, 'hidden');
        addClass(nameFieldElement, 'hidden');
      }
    }
  };
}

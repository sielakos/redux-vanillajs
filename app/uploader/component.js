import {noop} from 'utils';
import {ACTION_EVENT_NAME} from 'actionEventName';
import {ADD_DIAGRAM} from 'sidebar';

const template = `
  <form class="upload-form">
    name: <input class="upload-form-name" type="text"><br>
    bpmn file: <input class="upload-form-file" type="file"><br>
    <button type="submit">add diagram</button>
  </form>
`;

export function component(node) {
  node.innerHTML = template;

  const nameElement = node.querySelector('.upload-form-name');
  const fileElement = node.querySelector('.upload-form-file');

  node.addEventListener('submit', (event) => {
    const name = nameElement.value;
    const file = fileElement.files[0];
    const reader = new FileReader();

    event.preventDefault();

    reader.onload = () => {
      const event = new Event(ACTION_EVENT_NAME);
      event.reduxAction = {
        type: ADD_DIAGRAM,
        name,
        diagram: reader.result
      };

      document.dispatchEvent(event);
    };

    reader.readAsText(file);
  });

  return noop;
}

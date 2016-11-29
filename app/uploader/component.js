import {noop, dispatchAction} from 'utils';
import {ADD_DIAGRAM} from 'sidebar';
import {$FileReader} from 'dom';
import {saveDiagram} from 'mockServer';

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
    const reader = new $FileReader();

    event.preventDefault();

    reader.onload = () => {
      const diagram = reader.result;

      dispatchAction(() => {
        saveDiagram(diagram)
          .then(() => dispatchAction({
            type: ADD_DIAGRAM,
            name,
            diagram
          }));
      });
    };

    reader.readAsText(file);
  });

  return noop;
}

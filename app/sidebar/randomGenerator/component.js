import {dispatchAction, pipe, noop} from 'utils';
import {allDiagrams} from 'bpmn';

const template = `
  <button class="random-btn">Add random diagram</button>
`;

export function component(createAddDiagramAction) {
  return (node) => {
    node.innerHTML = template;

    const randomBtn = node.querySelector('.random-btn');

    randomBtn.addEventListener('click', pipe(
      getRandomDiagram,
      createAddDiagramAction,
      dispatchAction
    ));

    return noop;
  };
}

function getRandomDiagram() {
  const max = allDiagrams.length - 1;
  const index = Math.round(Math.random() * max);
  const diagram = allDiagrams[index];
  const name = 'diagram_' + Math.random();

  return {
    name,
    diagram
  };
}

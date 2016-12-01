import {dispatchAction, pipe} from 'utils';
import {allDiagrams} from 'bpmn';

const template = `
  <button class="random-btn">Add random diagram</button>
`;

export function component({createAddDiagramAction}) {
  const dispatchRandomDiagram = pipe(
    getRandomDiagram,
    createAddDiagramAction,
    dispatchAction
  );

  window.addRandomDiagrams = (size) => {
    for (let i = 0; i < size; i++) {
      dispatchRandomDiagram();
    }
  };

  window.startRemoveKillerTest = (rounds, size) => {
    if (rounds < 1) {
      return;
    }

    window.addRandomDiagrams(size);
    setTimeout(() => {
      window.dispatchClearAll();
      window.startRemoveKillerTest(rounds - 1, size);
    });
  };

  return (node) => {
    node.innerHTML = template;

    const randomBtn = node.querySelector('.random-btn');

    randomBtn.addEventListener('click', dispatchRandomDiagram);

    return [];
  };
}
component.composable = true;

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

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

  const searchRandomTerm = (callback) => {
    setTimeout(() => {
      const searchTerm = Math.round(Math.random() * 100).toString();

      window.searchDiagrams(searchTerm);

      setTimeout(callback);
    });
  };

  const _startRemoveKillerTest = (rounds, size, callback) => {
    if (rounds < 1) {
      return callback();
    }

    window.addRandomDiagrams(size);

    searchRandomTerm(
      searchRandomTerm.bind(null, ()=> {
        window.searchDiagrams('');
        window.dispatchClearAll();
        _startRemoveKillerTest(rounds - 1, size, callback);
      })
    );
  };

  window.startRemoveKillerTest = (rounds, size) => {
    const startTime = new Date().getTime();
    const numberOfUpdates = rounds * (size + 4);
    const numberOfAdd = rounds * size;
    const numberOfClear = rounds;

    _startRemoveKillerTest(rounds, size, () => {
      const endTime = new Date().getTime();
      const totalTime = endTime - startTime;
      const updatesPerSecond = 1000 * numberOfUpdates / totalTime;

      const msg =
        `Performed ${numberOfUpdates} update actions:
        Rounds: ${rounds},
        Size of round: ${size},
        Add actions: ${numberOfAdd}
        Clear actions: ${numberOfClear}
        Search actions: ${rounds * 3}
        Total time: ${totalTime} ms
        Speed: ${updatesPerSecond} updates / second`
          .split('\n')
          .map(line => line.trim())
          .join('\n');

      console.log(msg);
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

// import Viewer from 'bpmn-js/lib/NavigatedViewer';
import {connect} from 'utils';
import {getDiagram} from 'sidebar';

function createComponent(node) {
  // const viewer = new Viewer({
  //   container: node,
  //   height: '400'
  // });
  //
  // let lastName;
  //
  // return ({name, diagram}) => {
  //   if (name && lastName !== name) {
  //     lastName = name;
  //
  //     viewer.importXML(diagram, function(err) {
  //       if (err) {
  //         node.innerHTML = `Could not load diagram ${name}, got error ${err}`;
  //       }
  //
  //       resetZoom(viewer);
  //     });
  //   }
  // };

  return [];
}

function resetZoom(viewer) {
  const canvas = viewer.get('canvas');

  canvas.resized();
  canvas.zoom('fit-viewport', 'auto');
}

export const component = connect(
  (state) => {
    const name = state.bpmnViewer.name;

    return {
      name,
      diagram: name ? getDiagram(state.list, name) : undefined
    };
  },
  createComponent
);

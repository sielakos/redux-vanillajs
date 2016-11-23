import {component as sidebarComponent} from 'sidebar';
import {mountComponents, get, connect} from 'utils';
import {component as uploaderComponent} from 'uploader';
import {component as bpmnViewerComponent} from 'bpmnViewer';

const template = `
  <div class="content">
    <div class="sidebar">
      Sidebar
    </div>
    <div class="main-content">
      <div class="uploader"></div>
      <div class="viewer"></div>
    </div>
  </div>
`;

export function component(node) {
  node.innerHTML = template;

  return mountComponents(node, [
    {
      target: '.sidebar',
      component: connect('list', sidebarComponent)
    },
    {
      target: '.uploader',
      component: uploaderComponent
    },
    {
      target: '.viewer',
      component: bpmnViewerComponent
    }
  ]);
}

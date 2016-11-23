import {component as sidebarComponent} from 'sidebar';
import {mountComponents, get, connect} from 'utils';

const template = `
  <div class="content">
    <div class="sidebar">
      Sidebar
    </div>
    <div class="main">
      Main content
    </div>
  </div>
`;

export function component(node) {
  node.innerHTML = template;

  return mountComponents(node, [
    {
      target: '.sidebar',
      component: connect('list', sidebarComponent)
    }
  ]);
}

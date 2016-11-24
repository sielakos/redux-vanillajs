import {connect, list, mountComponents, get, pipe} from 'utils';
import {component as itemComponent} from './item';
import {component as clearAllComponent} from './clearAll';

const template = `
  <div class="clear-all"></div>
  <ul class="list">
  </ul>
`;

function createComponent(node) {
  node.innerHTML = template;

  const updateMounted = mountComponents(node, [
    {
      target: '.list',
      component: connect(
        'list',
        list(itemComponent, {
          tag: 'li',
          key: 'name'
        })
      )
    },
    {
      target: '.clear-all',
      component: clearAllComponent
    }
  ]);

  return updateMounted;
}

function getProperties({list, diagrams}) {
  return {
    list: list.map(name => ({
      ...diagrams[name],
      name
    }))
  };
}

export const component = connect(
  getProperties,
  createComponent,
);



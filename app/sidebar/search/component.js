import {dispatchAction, inputField, compileTemplate} from 'utils';

const template = compileTemplate`
  search: <input ${inputField('search')} type="text">
`;

export function component({createSearchAction}) {
  return (node) => {
    const update = template(node);

    const searchField = node.querySelector('input');

    searchField.addEventListener('keyup', () => {
      dispatchAction(
        createSearchAction(searchField.value)
      );
    });

    return update;
  };
}

component.composable = true;

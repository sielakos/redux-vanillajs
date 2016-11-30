import {dispatchAction, inputField, jsx} from 'utils';

const template = <input component={inputField('search')} type="text" />;

export function component({createSearchAction}) {
  return (node, eventsBus) => {
    const update = template(node, eventsBus);

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

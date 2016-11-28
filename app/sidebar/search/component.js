import {dispatchAction, setInputValue} from 'utils';

const template = `
  search: <input type="text">
`;

export function component(createSearchAction) {
  return (node) => {
    node.innerHTML = template;

    const searchField = node.querySelector('input');

    searchField.addEventListener('keyup', () => {
      dispatchAction(
        createSearchAction(searchField.value)
      );
    });

    return (state) => {
      setInputValue(searchField, state.search || '');
    }
  };
}

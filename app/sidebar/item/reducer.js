export const EDIT_SIDEBAR_ITEM = 'EDIT_SIDEBAR_ITEM';
export const CHANGE_DIAGRAM_NAME = 'CHANGE_DIAGRAM_NAME';

export function reducer(state, action) {
  switch (action.type) {
    case EDIT_SIDEBAR_ITEM:
      return editSidebarItem(state);
    case CHANGE_DIAGRAM_NAME:
      return changeSidebarName(state, action);
  }

  return state;
}

function editSidebarItem(state) {
  return {
    ...state,
    edit: true
  };
}

function changeSidebarName(state, {newName}) {
  return {
    ...state,
    edit: false,
    name: newName
  };
}

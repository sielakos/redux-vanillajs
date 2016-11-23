import * as sidebar from 'sidebar';
import {combineReducers} from 'redux';

export const reducer = combineReducers({
  list: sidebar.reducer
});

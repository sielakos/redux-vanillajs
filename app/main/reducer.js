import * as sidebar from 'sidebar';
import * as bpmnViewer from 'bpmnViewer';
import {combineReducers} from 'redux';

export const reducer = combineReducers({
  list: sidebar.reducer,
  bpmnViewer: bpmnViewer.reducer
});

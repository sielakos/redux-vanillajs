import {component as sidebarComponent} from 'sidebar';
import {compileTemplate, get, connect} from 'utils';
import {component as uploaderComponent} from 'uploader';
import {component as bpmnViewerComponent} from 'bpmnViewer';

export const component = compileTemplate`
  <div class="content">
    <div class="sidebar">
      ${connect('list', sidebarComponent)}
    </div>
    <div class="main-content">
      <div class="uploader">${uploaderComponent}</div>
      <div class="viewer">${bpmnViewerComponent}</div>
    </div>
  </div>
`;

import {ACTION_EVENT_NAME} from 'actionEventName';
import {$document} from 'dom';

export function dispatchAction(action) {
  const actionEvent = new Event(ACTION_EVENT_NAME);

  actionEvent.reduxAction = action;

  $document.dispatchEvent(actionEvent);
}

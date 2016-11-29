import {ACTION_EVENT_NAME} from 'actionEventName';
import {$document} from 'dom';

export function dispatchAction(action) {
  if (typeof action === 'function') {
    return action(dispatchAction);
  }

  const actionEvent = new Event(ACTION_EVENT_NAME);

  actionEvent.reduxAction = action;

  $document.dispatchEvent(actionEvent);
}

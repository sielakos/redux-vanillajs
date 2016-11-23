import {ACTION_EVENT_NAME} from 'actionEventName';

export function dispatchAction(action) {
  const actionEvent = new Event(ACTION_EVENT_NAME);

  actionEvent.reduxAction = action;

  document.dispatchEvent(actionEvent);
}

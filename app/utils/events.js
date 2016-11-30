import {secureInterface} from './secureInterface';

export const ALL_EVENTS = '$all';
export const DESTROY_EVENT = '$destroy';

export function createEventsBus(father) {
  const instance = new Events(father);

  return secureInterface(instance, {extraProperties: ['on', 'subscribeToAll', 'fireEvent']});
}

class Events {
  constructor(father) {
    this._listeners = {};

    this.subscribeToAll(father);
  }

  subscribeToAll(events) {
    if (events) {
      events.on(ALL_EVENTS, (event) => {
        if (event.stopped) {
          return;
        }

        this.fireEvent(event.name, event.data);
      });
    }
  }

  on(name, listener) {
    this._addListenerForName(name, listener);
  }

  fireEvent(name, data) {
    const event = new Event({name, data});
    const listeners = this._getEventListeners(name);

    listeners.forEach(listener => listener(event));
  }

  _getEventListeners(name) {
    return this._getListenersForName(name)
      .concat(this._getListenersForName(ALL_EVENTS));
  }

  _addListenerForName(name, listener) {
    this._listeners[name] = this._getListenersForName(name)
      .concat(listener);

    return this._removeListenerForName.bind(this, name, listener);
  }

  _removeListenerForName(name, listener) {
    this._listeners[name] = this._getListenersForName(name)
      .filter(otherListener => listener !== otherListener);
  }

  _getListenersForName(name) {
    if (!this._listeners[name]) {
      this._listeners[name] = [];
    }

    return this._listeners[name];
  }
}
class Event {
  constructor({name, data, stopped = false}) {
    this.name = name;
    this.data = data;
    this.stopped = stopped;
  }

  stopPropagation() {
    this.stopped = true;
  }
}

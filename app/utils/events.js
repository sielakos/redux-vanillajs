export const ALL_EVENTS = '$all';
export const DESTROY_EVENT = '$destroy';

export function createEventsBus(father) {
  return new Events(father);
}

class Events {
  constructor(father) {
    this._listeners = {};
    this._subscriptions = [];

    this.subscribeToAll(father);
  }

  subscribeToAll(events) {
    if (events) {
      const subscription = events.on(ALL_EVENTS, (event) => {
        if (event.stopped && event.name !== DESTROY_EVENT) {
          return;
        }

        this.fireEvent(event.name, event.data);
      });

      this._subscriptions.push(subscription);
    }
  }

  on(name, listener) {
    this._addListenerForName(name, listener);

    return this._removeListenerForName.bind(this, name);
  }

  fireEvent(name, data) {
    const event = new Event({name, data});
    const listeners = this._getEventListeners(name);

    listeners.forEach(listener => listener(event));

    this._handleDestroyEvent(name);
  }

  _handleDestroyEvent(name) {
    if (name === DESTROY_EVENT) {
      return this._removeAllSubscriptions();
    }
  }

  _removeAllSubscriptions() {
    this._listeners = [];
    this._subscriptions.forEach(subscription => subscription());
    this._subscriptions = [];
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

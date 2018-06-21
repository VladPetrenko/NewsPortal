'use strict'

class Emitter {
    constructor() {
        this._subscribers = {};
    }

    subscribe(eventName, subscriber) {
        if (!this._subscribers[eventName]) {
            this._subscribers[eventName] = [];
        }
        this._subscribers[eventName].push(subscriber);
    }

    unsubscribe(eventName, subscriber) {
        if (this._subscribers[eventName]) {
            this._subscribers[eventName] = this._subscribers[eventName]
                .filter(sbcr => subscriber !== sbcr);
            if (this._subscribers[eventName].length === 0) {
                delete this._subscribers[eventName];
            }
        }
    }

    notify(eventName, data) {
        if (this._subscribers[eventName]) {
            this._subscribers[eventName].forEach((subscriber) => subscriber(data));
        }
    }
}

module.exports = Emitter;
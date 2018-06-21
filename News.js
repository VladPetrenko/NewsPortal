'use strict';

class News {
    constructor(id, title, em) {
        this._id = id;
        this._title = title;
        this._em = em;
        this._articles = [];
    }

    postMessage(title, message) {
        this._articles.push(title, message);
        this._em.notify(this._id, { title: this._title, message, id: this._id });
    }
}

module.exports = News;
'use strict';

class User {
    constructor(id, name) {
        this._id = id;
        this._name = name;
        this._articles = [];
        this._subscriptions = [];
        this.post = this.post.bind(this);
    }

    post(data) {
        this._articles.push(data);
        // return this._articles;
    }
}

module.exports = User;
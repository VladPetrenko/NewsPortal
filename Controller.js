'use strict';

const fs = require('fs');
const Emitter = require('./Emitter');
const User = require('./User');
const News = require('./News');

let em = new Emitter();

let user1 = new User(1, 'John');
let user2 = new User(2, 'Ed');
let user3 = new User(3, 'Tom');

let users = [user1, user2, user3];

let news1 = new News(1, 'Verge', em);
let news2 = new News(2, 'sfw', em);
let news3 = new News(3, 'adme', em);

let news = [news1, news2, news3];

em.subscribe(1, users[0].post);
em.subscribe(2, users[0].post);
em.subscribe(3, users[0].post);



news1.postMessage('it', 'this about it');
news2.postMessage('future', 'what will wait us in the future', 2);
news3.postMessage('sfw', 'some things', 3);

class Controller {

    getUserById(id) {
        let user = users.find((user) => user._id == id);
        if (user) {
            return user
        }
    }

    getNewsById(id) {
        let newsId = news.find((news) => news._id == id);
        if (newsId) {
            return newsId._articles;
        }
    }
    getSubscriptions(id) {
        let user = this.getUserById(id);
        if (user) {
            return JSON.stringify(user._subscriptions);
        }
    }

    export(id) {
        //
    }


    subscribe(userId, newsId) {
        let user = this.getUserById(userId);
        em.subscribe(newsId, user.post);
        let x = news.find((news) => news._id == newsId);
        user._subscriptions.push(x._title);

    }

    unsubscribe(userId, newsId) {
        let user = this.getUserById(userId);
        em.unsubscribe(newsId, user.post);
        let x = news.find((news) => news._id == newsId);
        user._subscriptions = user._subscriptions.filter((sbscr) => sbscr !== x._title);
    }

}

module.exports = Controller;
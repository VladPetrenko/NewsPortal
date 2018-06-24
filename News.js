'use strict';

class News {
    constructor(id, title, em) {
        this._id = id;
        this._title = title;
        this._em = em;
        this._articles = [];
    }

    //postMessage(title, message)
    postMessage() {
        setInterval(() => {
            let title = Math.random().toString(36).substr(2, 5);
            let message = Math.random().toString(36).substr(0, 15);
            this._articles.push({title, message});
            this._em.notify(this._id, { title: title, message, news_id: this._id });
        }, 5000)
        
    }


}

module.exports = News;
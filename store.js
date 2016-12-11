const MongoClient = require('mongodb').MongoClient;

function storeDB(config) {
  const store = {};
  let DB;

  store.getUrlByUrl = (url) => {
    return DB.collection('UrlShorts')
    .findOne({ url: url });
  };

  store.getUrlByShortUrl = shortUrl =>
    DB.collection('UrlShorts')
    .findOne({ shortUrl: shortUrl });

  store.getUrls = () =>
    DB.collection('UrlShorts')
    .find()
    .toArray();

  store.existUrl = url =>
    DB.collection('UrlShorts')
    .count({ url: url })
    .then(n => n > 0);

  store.existShortUrl = shortUrl =>
    DB.collection('UrlShorts')
    .count({ shortUrl: shortUrl })
    .then(n => n > 0);

  store.insertUrl = (urlObj) => {
    return DB.collection('UrlShorts')
    .insert(urlObj);
  };

  const initialize = () => {
    return MongoClient.connect(config.uri)
    .then((db) => {
      DB = db
      return {
        success: true,
        msg: 'Db initialized',
        store: store,
      };
    });
  };

  return initialize();
}

module.exports = storeDB;

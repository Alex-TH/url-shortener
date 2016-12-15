function storeDB(db) {
  const store = {};
  const DB = db;

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
    .insert(urlObj)
    .then(result => result.ops[0]);
  };

  return store;
}

module.exports = storeDB;

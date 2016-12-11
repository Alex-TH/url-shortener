const shortener = require('./shortener');

function UrlInteractor(store) {
  const validateShort = (urlObj) => {
    return store.existShortUrl(urlObj.shortUrl)
    .then(exist => {
      if (!exist) {
        return urlObj;  
      }
      return validateShort(shortener.shortify(urlObj.url));
    });
  };

  const shortUrl = (url) => {
    const result = shortener.shortify(url);
    return store.getUrlByUrl(result.url)
    .then((urlObj) => {
      if (!urlObj) {
        return validateShort(result)
        .then(urlObj => store.insertUrl(urlObj))
        .then(result => result.ops[0]);
      }
      return urlObj;
    })
  };

  const getLongUrl = (shortUrl) =>
    store.getUrlByShortUrl(shortUrl)
    .then(urlObj => urlObj ? urlObj.url : undefined);

  const getUrls = () => store.getUrls();

  return {
    shortUrl,
    getLongUrl,
    getUrls,
  };
}

module.exports = UrlInteractor;

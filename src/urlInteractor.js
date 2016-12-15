const shortener = require('./shortener');

function UrlInteractor(store) {
  const validateShort = (urlObj) => {
    return store.existShortUrl(urlObj.shortUrl)
    .then(exist => {
      if (!exist) {
        return urlObj;  
      }
      shortener.increaseRandomLength();
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
      }
      return urlObj;
    });
  };

  const personalizeUrl = ({ url, personalized }) => {
    const urlResult = shortener.getUrlWithProtocol(url);
    return store.existShortUrl(personalized)
    .then(exist => {
      if (!exist) {
        return store.insertUrl({
          url: urlResult,
          shortUrl: personalized,
        });
      }
      return {
        success: false,
        message: 'Url personalized alredy taken!',
      }
    });
  };

  const getLongUrl = (shortUrl) =>
    store.getUrlByShortUrl(shortUrl)
    .then(urlObj => urlObj ? urlObj.url : undefined);

  const getUrls = () => store.getUrls();

  const updateUrlMetrics = (shortUrl) => store.updateUrlMetrics(shortUrl);

  return {
    shortUrl,
    getLongUrl,
    getUrls,
    personalizeUrl,
    updateUrlMetrics,
  };
}

module.exports = UrlInteractor;

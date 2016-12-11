const shortener = require('./shortener');
function urlAPI() {
  const urls = {};
  const shortUrls = {};

  const shortUrl = (req, res) => {
    const params = req.body;
    let result = shortener.shortify(params.url);
    if (urls[result.url] === undefined) {
      while(shortUrls[result.shortUrl] !== undefined) result = shortener.shortify(params.url);
      urls[result.url] = result.shortUrl;
      shortUrls[result.shortUrl] = result.url;
    } else {
      result.shortUrl = urls[result.url];
    }
    res.json(result);
  };

  const getLongUrl = (shortUrl) => shortUrls[shortUrl];

  const getUrls = (req, res) => {
    const urlsArray = [];
    Object.keys(urls).forEach((url) => urlsArray.push(`localhost:3000/${urls[url]} = ${url}`));
    res.json(urlsArray);
  };

  return {
    post: {
      shortUrl,
    },
    get: {
      getUrls,
    },
    getLongUrl,
  };
}

module.exports = urlAPI();

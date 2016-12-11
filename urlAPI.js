const shortener = require('./shortener');

function urlAPI(urlInteractor) {
  const shortUrl = (req, res) =>
    urlInteractor.shortUrl(req.body.url)
    .then(result => {
      res.json(result);
    })
    .catch((err) => res.json({
      success: false,
      error: err,
    }));

  const getLongUrl = (req, res) => {
    urlInteractor.getLongUrl(req.params.shortUrl)
    .then((url) => {
      if (url) {
        res.redirect(301, url);  
      } else {
        throw 'Not found';
      }
    })
    .catch(() => res.send('<h1>NOT FOUND</h1>'));
  }

  const getUrls = (req, res) => {
    urlInteractor.getUrls()
    .then(urls => urls.map(url => `localhost:3000/${url.shortUrl} = ${url.url}`))
    .then(urls => res.json(urls));
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

module.exports = urlAPI;

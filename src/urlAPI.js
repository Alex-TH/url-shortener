const shortener = require('./shortener');

function urlAPI(urlInteractor) {
  const shortUrl = (req, res) => {
    if (!req.body.url || req.body.url.trim() === '') {
      res.json({
        success: false,
        error: 'Empty url not allowed',
      });
      return;
    }
    urlInteractor.shortUrl(req.body.url)
    .then(result => {
      res.json(result);
    })
    .catch((err) => res.json({
      success: false,
      error: err,
    }));
  };

  const personalizeUrl = (req, res) => {
    const body = req.body;
    if (!body.url || body.url.trim() === '' || !body.personalized || body.personalized.trim === '') {
      res.json({
        success: false,
        error: 'Empty url not allowed',
      });
      return;
    }
    urlInteractor.personalizeUrl(body)
    .then(result => res.json(result))
    .catch(err => res.json({
      success: false,
      error: err,
    }));
  };

  const getLongUrl = (req, res) => {
    const shortUrl = req.params.shortUrl;
    urlInteractor.getLongUrl(shortUrl)
    .then((url) => {
      if (url) {
        console.log(shortUrl)
        res.redirect(301, url);
        urlInteractor.updateUrlMetrics(shortUrl)
      } else {
        throw 'Not found';
      }
    })
    .catch(() => res.send('<h1>NOT FOUND</h1>'));
  }

  const getUrls = (req, res) => {
    urlInteractor.getUrls()
    .then(urls => urls.map(url => `localhost:3000/${url.shortUrl} = ${url.url} visited ${url.metrics ? url.metrics.visited : 0} times`))
    .then(urls => res.json(urls));
  };

  return {
    post: {
      shortUrl,
      personalizeUrl,
    },
    get: {
      getUrls,
    },
    getLongUrl,
  };
}

module.exports = urlAPI;

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const UrlAPI = require('./urlAPI');
const UrlInteractor = require('./urlInteractor');

function App(store) {
  const app = express();
  const urlInteractor = UrlInteractor(store);
  const urlAPI = UrlAPI(urlInteractor);

  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(express.static(path.join(__dirname, '../public')));

  app.post('/url/:function', (req, res) => {
    if (urlAPI.post[req.params.function] !== undefined) {
      urlAPI.post[req.params.function](req, res);
    } else {
      res.status(404).json({
        success: false,
        message: 'Function does not exist',
      });
    }
  });

  app.get('/url/:function', (req, res) => {
    if (urlAPI.get[req.params.function] !== undefined) {
      urlAPI.get[req.params.function](req, res);
    } else {
      res.status(404).json({
        success: false,
        message: 'Function does not exist',
      });
    }
  });

  app.get('/urls', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/urls.html'));
  });

  app.get('/:shortUrl', (req, res) => {
    urlAPI.getLongUrl(req, res);
  });

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });

  return app;
}

module.exports = App;

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const urlAPI = require('./urlAPI');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// add api urls
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
  res.sendFile(path.join(__dirname, 'public/urls.html'));
});

app.get('/:shortUrl', (req, res) => {
   const url = urlAPI.getLongUrl(req.params.shortUrl);
   if (url === undefined) {
     res.send('<h1>NOT FOUND</h1>');
   } else {
     res.redirect(301, url);
   }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

module.exports = app;

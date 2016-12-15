const fs = require('fs');
function shortener() {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  let RANDOM_LENGTH = parseInt(fs.readFileSync('randomLength.txt', 'utf8'));

  const randomStr = (length) => {
    const strArr = [];
    for (let i = 0;i < length;i += 1) {
      const character = characters[Math.floor(Math.random() * characters.length)];
      strArr.push(character);
    }
    return strArr.join('');
  }

  const getUrlProtocol = (url) => {
    const match = url.match(/^([a-zA-Z]+):\/\//);
    return !!match ? match[1] : '';
  };

  const getUrlWithProtocol = (url) => {
    if (getUrlProtocol(url) === '') {
      url = `http://${url}`;
    }
    return url;
  };

  const shortify = (url) => {
    return { 
      url: getUrlWithProtocol(url),
      shortUrl: randomStr(RANDOM_LENGTH),
    }
  };

  const increaseRandomLength = () => {
    RANDOM_LENGTH += 1;
    return fs.writeFileSync('randomLength.txt', RANDOM_LENGTH, 'utf8')
  };

  return { 
    shortify,
    getUrlWithProtocol,
    increaseRandomLength,
  };
}

module.exports = shortener();

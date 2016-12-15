function shortener() {
  const RANDOM_LENGTH = 7;
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

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

  return { 
    shortify,
    getUrlWithProtocol,
  };
}

module.exports = shortener();

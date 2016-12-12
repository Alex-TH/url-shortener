;(function urls() {
  const result = document.getElementById('result');
  fetch('url/getUrls')
  .then(res => res.json())
  .then((res) => {
    res.forEach((url) => {
      const li = document.createElement('li');
      li.textContent = url;
      result.appendChild(li);
    });
  });
})();

;(function index() {
  const result = document.getElementById('result');
  document.getElementById('btnShort').onclick = (e) => {
    fetch('url/shortUrl', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: document.getElementById('url').value,
      }),
    })
    .then(res => res.json())
    .then((res) => {
      const li = document.createElement('li');
      if (res.shortUrl) {
        li.textContent = `localhost:3000/${res.shortUrl} = ${res.url}`;
        result.appendChild(li);
      }
    });
  };
})();

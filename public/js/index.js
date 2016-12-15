;(function index() {
  const result = document.getElementById('result');
  const personalized = document.getElementById('personalized');
  const btnShort = document.getElementById('btnShort')
  btnShort.onclick = (e) => {
    const url = personalized.value.trim() !== '' ? 'url/personalizeUrl' : 'url/shortUrl';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: document.getElementById('url').value,
        personalized: personalized.value,
      }),
    })
    .then(res => res.json())
    .then((res) => {
      const li = document.createElement('li');
      if (res.shortUrl) {
        li.textContent = `localhost:3000/${res.shortUrl} = ${res.url}`;
      } else {
        li.textContent = res.message || 'error!';
      }
      result.appendChild(li);
    });
  };
  
  personalized.onchange = () => {
    if (personalized.value.trim() === '') {
      btnShort.value = 'Short URL';
    } else {
      btnShort.value = 'Personalize URL';
    }
  };

})();

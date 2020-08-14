fetch('https://api.imgflip.com/get_memes')
  .then(function (response) {
    return response.json()
  }).then(function (response) {
    let imagesDiv = document.querySelector('#images')
    response.data.memes.forEach(data => {
      imagesDiv.innerHTML += `<img src="${data.url}">`
    })
  }).catch(function (err) {
    console.error(err)
  })
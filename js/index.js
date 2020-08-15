//Use an Immediately Invoked Function Expression (IFFE) (10)
(function () {
  //Create an XMLHttpRequest object (15)
  //Use the XMLHttpRequest object to get XML/JSON data (15)
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function (evt) {
    //Use a locally scoped variable (2)
    let req = evt.target;
    //Use an If statement (5)
    //Use a logical AND operator (5)
    if (req.readyState === XMLHttpRequest.DONE && req.status === 200) {
      //Use querySelectorAll() (2) 
      //position5Access a built-in property for the document object (2)
      let imagesDiv = document.querySelectorAll('#images')[0]
      //Use a Try ... Catch statement (5)
      try {
        //Access a built-in property for the window object (2)
        let res = window.JSON.parse(xhr.response);
        //Use the innerHTML property (2)
        imagesDiv.innerHTML = '';
        //Use a For loop (5)
        for (let i = 0; i < res.data.memes.length; i++) {
          imagesDiv.innerHTML += `<img src="${res.data.memes[i].url}">`
        }
      }
      catch (e) {
        console.error(e)
        imagesDiv.innerHTML = 'Something worng happened while parsing the data fetched from the API.';
      }
    }
  };
  //Use a 3rd party API (10)
  xhr.open('GET', 'https://api.imgflip.com/get_memes');
  xhr.send();
})();
//Use a global variable (2)
//Use an object with a method (function property) (5)
//Use an object with an array for a property value (5)
//Create an object literal (2)
window.memes = {
  data: undefined, //An array
  filterBoxCount: function(count){
    //Use the 'this' keyword effectively (5)
    if(this.data){
      //Access an objects method using dot notation (2)
      return this.data.filter(e => e.box_count == count);
    }
    else{
      return [];
    }
  }
};

//A custom function using parameters (5)
function updateImages(boxCount){
  let imagesDiv = document.querySelector('#images')
  imagesDiv.innerHTML = '';
  let data = boxCount? memes.filterBoxCount(boxCount) : memes.data;
  //Use a For loop (5)
  for (let i = 0; i < data.length; i++) {
    console.log(data[i])
    imagesDiv.innerHTML += `<a class="meme-link" href="edit.html?url=${data[i].url}&box=${data[i].box_count}"><img class="meme" src="${data[i].url}"><a/>`
  }
}

//Use an Immediately Invoked Function Expression (IFFE) (10)
(function () {
  //Create an XMLHttpRequest object (15)
  //Use the XMLHttpRequest object to get XML/JSON data (15)
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function (evt) {
    //Use a locally scoped variable (2)
    //Access an objects property using dot notation (2)
    let req = evt.target;
    //Use an If statement (5)
    //Use a logical AND operator (5)
    if (req.readyState === XMLHttpRequest.DONE && req.status === 200) {
      //Use a Try ... Catch statement (5)
      try {
        //Access a built-in property for the window object (2)
        let res = window.JSON.parse(xhr.response);
        window.memes.data = res.data.memes;
        updateImages()
      }
      catch (e) {
        //Use querySelectorAll() (2) 
        //Access a built-in property for the document object (2)
        let imagesDiv = document.querySelectorAll('#images')[0]
        //Use the innerHTML property (2)
        imagesDiv.innerHTML = 'Something worng happened while parsing the data fetched from the API.';
      }
    }
  };
  //Use a 3rd party API (10)
  xhr.open('GET', 'https://api.imgflip.com/get_memes');
  xhr.send();
})();

window.onload = () => {
  document.querySelector('#box-count').addEventListener('change', e => {
    updateImages(e.target.value)
  })
}
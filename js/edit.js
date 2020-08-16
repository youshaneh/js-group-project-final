function preventDragging(e) {
  e.preventDefault();
}
window.onload = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const boxCount = urlParams.get('box');
  const editArea = document.querySelector('#edit-area');
  editArea.innerHTML = `<img src="${urlParams.get('url')}" ondragstart="preventDragging(event);">`;
  for (let i = 0; i < boxCount; i++) {
    editArea.innerHTML += `<p id="box${i}" style="top: ${i * 40}px; left:20px;">box${i}</p>`
  }
  for (let i = 0; i < boxCount; i++) {
    editArea.innerHTML += `<br/>
      <input id="line${i}" placeholder="box${i}">
      #<input id="lineColor${i}" placeholder="box${i} color">`
  }
  for (let i = 0; i < boxCount; i++) {
    document.querySelector(`#box${i}`).addEventListener('mousedown', e => {
      console.log(e)
      window.draggingInfo = {
        element: e.target,
        offsetX: e.offsetX,
        offsetY: e.offsetY
      }
    })
    document.querySelector(`#line${i}`).addEventListener('change', e => {
      document.querySelector(`#box${i}`).innerHTML = e.target.value;
    })
    document.querySelector(`#lineColor${i}`).addEventListener('change', e => {
      document.querySelector(`#box${i}`).style.color = '#' + e.target.value;
    })
  }
  editArea.addEventListener('mouseup', e => {
    window.draggingInfo = null;
  })
  editArea.addEventListener('mousemove', e => {
    if (window.draggingInfo) {
      window.draggingInfo.element.style.top = e.pageY - window.draggingInfo.offsetY + 'px';
      window.draggingInfo.element.style.left = e.pageX - window.draggingInfo.offsetX + 'px';
    }
  })

}
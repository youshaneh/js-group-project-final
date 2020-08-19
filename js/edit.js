function preventDragging(e) {
  e.preventDefault();
}
window.onload = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const boxCount = urlParams.get('box');
  const editArea = document.querySelector('#edit-area');
  const tools = document.querySelector('#tools');
  editArea.innerHTML = `<img class="meme" src="${urlParams.get('url')}" ondragstart="preventDragging(event);">`;
  for (let i = 0; i < boxCount; i++) {
    editArea.innerHTML += `<p id="box${i}" style="top: ${i * 60 + 10}px; left:20px;">box${i}</p>`
  }
  for (let i = 0; i < boxCount; i++) {
    tools.innerHTML += `
      <input id="line${i}" class="tool" placeholder="box${i}">
      Color: #<input id="lineColor${i}" class="tool color" value ="FFFFFF">
      Size: <input id="lineSize${i}" class="tool size" value ="60">px<br/>`
  }
  for (let i = 0; i < boxCount; i++) {
    document.querySelector(`#box${i}`).addEventListener('mousedown', e => {
      window.draggingInfo = {
        element: e.target,
        offsetX: e.offsetX,
        offsetY: e.offsetY
      }
    })
    document.querySelector(`#line${i}`).addEventListener('input', e => {
      document.querySelector(`#box${i}`).innerHTML = e.target.value || `box${i}`;
    })
    document.querySelector(`#lineColor${i}`).addEventListener('input', e => {
      document.querySelector(`#box${i}`).style.color = '#' + e.target.value;
    })
    document.querySelector(`#lineSize${i}`).addEventListener('input', e => {
      document.querySelector(`#box${i}`).style.fontSize= e.target.value + 'px';
    })
  }
  editArea.addEventListener('mouseup', e => {
    window.draggingInfo = null;
  })
  editArea.addEventListener('mousemove', e => {
    if (window.draggingInfo) {
      let {x, y} = editArea.getBoundingClientRect();
      window.draggingInfo.element.style.top = e.pageY - y - window.draggingInfo.offsetY + 'px';
      window.draggingInfo.element.style.left = e.pageX - x - window.draggingInfo.offsetX + 'px';
    }
  })

}
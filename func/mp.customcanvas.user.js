window.arrayx = 1
window.arrayy = 1
const $insertimage = $('<input type="file" id="image_uploads" accept=".jpg, .jpeg, .png">');
let ingamecanvas
let $customcanvas
let canvasctx

function checkCanvasLoaded() {
  ingamecanvas = $('#canvas');
  if (ingamecanvas.length > 0) {
    console.log("canvasloaded")  
    clearInterval(checkcanvasinterval);
    $customcanvas = $(`<canvas width="${ingamecanvas.attr('width')}" height="${ingamecanvas.attr('height')}">`).css({ position: 'absolute', pointerEvents: 'none', left: '0px', top:'0px', imageRendering: 'pixelated', opacity: '50%'});
    canvasctx = $customcanvas[0].getContext('2d');  
    $('#painting-move').append($customcanvas);
    setInterval(drawcanvas, 100);
  }
}
var checkcanvasinterval = setInterval(checkCanvasLoaded, 100);

function drawcanvas() {
  const file = $insertimage[0].files[0];
  if (file) {
    const img = new Image(); // Create a new HTMLImageElement;
    img.onload = function() {
        canvasctx.clearRect(0,0,ingamecanvas.attr('width'),ingamecanvas.attr('height'))
        canvasctx.drawImage(img, window.arrayx, window.arrayy); // Draw the loaded image
    };

    img.src = URL.createObjectURL(file); // Set the image source
  }
}



$('body').append($insertimage);


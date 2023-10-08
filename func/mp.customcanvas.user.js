window.arrayx = 1
window.arrayy = 1
const $insertimage = $('<input type="file" id="image_uploads" accept=".jpg, .jpeg, .png">');
const arraySizePO = 3000
window.pixelsOverwrite = Array.from({
  length: arraySizePO
}, () =>
Array.from({
  length: arraySizePO
}, () => 50)
);

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

// Function to process the image and update pixelsOverwrite array
function processImage(startx, starty, image) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  const img = new Image();
  img.src = URL.createObjectURL(image);

  img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;

    // Draw the image on the canvas
    context.drawImage(img, 0, 0);

    for (let x = startx; x < startx + img.width; x++) {
      for (let y = starty; y < starty + img.height; y++) {
        // Get the pixel color at the specified coordinate
        const pixelColor = context.getImageData(x - startx, y - starty, 1, 1).data;
        if (pixelColor[3] < 255) {
          continue; // Skip this pixel if it's transparent
        }

        // Find the closest color from the colors array
        let closestColorIndex = 0;
        let closestColorDistance = Number.MAX_SAFE_INTEGER;

        for (let i = 0; i < colors.length; i++) {
          const color = colors[i];
          const colorValues = [
            (color >> 16) & 0xff,
            (color >> 8) & 0xff,
            color & 0xff,
          ];

          const distance = colorValues.reduce(
            (acc, val, index) => acc + Math.abs(val - pixelColor[index]),
            0
          );

          if (distance < closestColorDistance) {
            closestColorDistance = distance;
            closestColorIndex = i;
          }
        }

        // Update the pixelsOverwrite array with the closest color index
        pixelsOverwrite[x][y] = closestColorIndex;
      }
    }

    // Now pixelsOverwrite array is updated with color codes
    console.log(pixelsOverwrite);
  };
}

// Usage example:
const imageInput = document.getElementById('image_uploads');
imageInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  window.pixelsOverwrite = Array.from({
    length: arraySizePO
  }, () =>
  Array.from({
    length: arraySizePO
  }, () => 50)
  );
  if (file) {
    processImage(arrayx, arrayy, file);
  }
});


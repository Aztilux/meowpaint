const arraySizePO = 3000
window.pixelsOverwrite = Array.from({
  length: arraySizePO
}, () =>
Array.from({
  length: arraySizePO
}, () => 50)
);

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
const arraySize = 3000;
window.placedPixels = Array.from({
      length: arraySize
  }, () =>
  Array.from({
      length: arraySize
  }, () => 50)
);

const canvasworkerTime = performance.now();
/// canvas worker
const canvasloaderworker = `

const arraySize = 3000;
const colors = new Uint32Array([
0xFFFFFF, 0xC4C4C4, 0x888888, 0x555555, 0x222222, 0x000000, 0x006600, 0x22B14C,
0x02BE01, 0x51E119, 0x94E044, 0xFBFF5B, 0xE5D900, 0xE6BE0C, 0xE59500, 0xA06A42,
0x99530D, 0x633C1F, 0x6B0000, 0x9F0000, 0xE50000, 0xFF3904, 0xBB4F00, 0xFF755F,
0xFFC49F, 0xFFDFCC, 0xFFA7D1, 0xCF6EE4, 0xEC08EC, 0x820080, 0x5100FF, 0x020763,
0x0000EA, 0x044BFF, 0x6583CF, 0x36BAFF, 0x0083C7, 0x00D3DD, 0x45FFC8, 0x003638,
0x477050, 0x98FB98, 0xFF7000, 0xCE2939, 0xFF416A, 0x7D26CD, 0x330077, 0x005BA1,
0xB5E8EE, 0x1B7400, 0xCCCCCC
]);

self.addEventListener('message', async (event) => {
const currentPageUrl = event.data;
const urlParts = currentPageUrl.split("/");
const idWithFragment = urlParts[urlParts.length - 1];
const canvasid = idWithFragment.split("-")[0];

const imageResponse = await fetch('https://pixelplace.io/canvas/' + canvasid + '.png?t200000=' + Math.random());
const imageBlob = await imageResponse.blob();
const imageBitmap = await createImageBitmap(imageBlob);

const canvas = new OffscreenCanvas(imageBitmap.width, imageBitmap.height);
const ctx = canvas.getContext('2d');
ctx.drawImage(imageBitmap, 0, 0, imageBitmap.width, imageBitmap.height);

const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
const pixelData = imageData.data;
const placedPixels = Array.from({ length: arraySize }, () =>
  Array.from({ length: arraySize }, () => 50)
);

for (let y = 0; y < canvas.height; y++) {
  for (let x = 0; x < canvas.width; x++) {
    const pixelIndex = (y * canvas.width + x) * 4;
    const r = pixelData[pixelIndex];
    const g = pixelData[pixelIndex + 1];
    const b = pixelData[pixelIndex + 2];
    const a = pixelData[pixelIndex + 3]; // Adding alpha value

    // Check if alpha is less than 1
    if (a < 1) {
      placedPixels[x][y] = 1; // Set closestColorId to 1
    } else {
      const color = (r << 16) | (g << 8) | b;

      let closestColorId = 0;
      let minDistance = Number.MAX_SAFE_INTEGER;

      for (let i = 0; i < colors.length; i++) {
        const colorDistance = Math.abs(colors[i] - color);
        if (colorDistance < minDistance) {
          closestColorId = i;
          minDistance = colorDistance;
        }
      }

      placedPixels[x][y] = closestColorId;
    }
  }
}

self.postMessage(placedPixels);
});
`;

// Create the web worker from the workerCode
const canvasworkerBlob = new Blob([canvasloaderworker], {
  type: 'application/javascript'
});
const canvasworkerUrl = URL.createObjectURL(canvasworkerBlob);
const canvasworker = new Worker(canvasworkerUrl);

// Handle the response from the web worker
canvasworker.onmessage = function(event) {
  const canvasworkerendTime = performance.now();
  var processingTime = canvasworkerendTime - canvasworkerTime;
  const placedPixelsFromWorker = event.data;
  placedPixels = placedPixelsFromWorker;
  console.log(`Canvas processing took ${processingTime} ms.`);``
};

canvasworker.postMessage(window.location.href);


$(document).on('keydown', function(event) {
  const coordinates = $('#coordinates').text();
  const [x, y] = coordinates.split(',').map(coord => parseInt(coord.trim()));
  const selectedColorId = $('#palette-buttons a.selected').data('id');
  if (event.which === 90 && !$(':input[type="text"]').is(':focus') && placedPixels[x][y] != selectedColorId && placedPixels[x][y] != 50 && pixelsOverwrite[x][y] != 50 && pixelsOverwrite[x][y] != placedPixels[x][y]) {
    console.log(`${placedPixels[x][y]} => ${window.pixelsOverwrite[x][y]}`)
    placePixel(x, y, pixelsOverwrite[x][y])
  }
});
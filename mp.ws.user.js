window.mysocket = undefined;
const nativeWebSocket = window.WebSocket;
window.WebSocket = function(...args) {
  const socket = new nativeWebSocket(...args);
  socket.addEventListener('message', onpixelreceived); // Attach the message handler
  window.mysocket = socket;
  return socket;
};

function onpixelreceived(event) {
  if (event.data.startsWith("42")) {
    const data = JSON.parse(event.data.substr(2)); // Remove the "42" prefix from the message

    if (data[0] === "p") {
      const pixelData = data[1]; // Get the array containing pixel information

      // Use async/await to handle the pixel placement with delay
      for (const pixel of pixelData) {
        const x = pixel[0];
        const y = pixel[1];
        const color = pixel[2]; // Extract the color value (3rd value in the pixel array)
        const id = pixel[4]; // Extract the ID value (4th value in the pixel array)

        // Update placedPixels or perform any other necessary actions (DO NOT TOUCH THIS)
        if (x >= 0 && x < arraySize && y >= 0 && y < arraySize) {
          placedPixels[x][y] = color;
        }
      }
    }
  }
}

function placePixel(x, y, color) {
  window.mysocket.send(`42["p",[${x},${y},${color},1]]`);
}
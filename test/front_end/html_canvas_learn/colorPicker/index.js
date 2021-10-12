var img = new Image();
img.crossOrigin = 'anonymous';
img.src = 'https://mdn.github.io/dom-examples/canvas/pixel-manipulation/assets/rhino.jpg';

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

img.onload = function () {
  ctx.drawImage(img, 0, 0);
  img.style.display = 'none';
};

var hoveredColor = document.getElementById('hovered-color');
var selectedColor = document.getElementById('selected-color');

function pick(event, destination) {
  var x = event.layerX;
  var y = event.layerY;
  var pixel = ctx.getImageData(x, y, 1, 1);
  var [R, G, B, A] = pixel.data;

  const rgba = `rgba(${R}, ${G}, ${B}, ${A / 255})`;
  destination.style.background = rgba;
  destination.textContent = rgba;

  return rgba;
}

canvas.addEventListener('mousemove', function (event) {
  pick(event, hoveredColor);
});
canvas.addEventListener('click', function (event) {
  pick(event, selectedColor);
});

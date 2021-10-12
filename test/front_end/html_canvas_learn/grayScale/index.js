var img = new Image();
img.crossOrigin = 'anonymous';
img.src = 'https://mdn.github.io/dom-examples/canvas/pixel-manipulation/assets/rhino.jpg';

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

img.onload = function () {
  ctx.drawImage(img, 0, 0);
};

var original = function () {
  ctx.drawImage(img, 0, 0);
};

const filter = (mapper) => {
  ctx.drawImage(img, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const R = data[i];
    const G = data[i + 1];
    const B = data[i + 2];
    const A = data[i + 3];
    const mapped = mapper(R, G, B, A);
    data[i] = mapped[0];
    data[i + 1] = mapped[1];
    data[i + 2] = mapped[2];
    data[i + 3] = mapped[3];
  }

  ctx.putImageData(imageData, 0, 0);
};

var sepia = function () {
  filter((R, G, B, A) => [
    Math.min(Math.round(0.393 * R + 0.769 * G + 0.189 * B), 255),
    Math.min(Math.round(0.349 * R + 0.686 * G + 0.168 * B), 255),
    Math.min(Math.round(0.272 * R + 0.534 * G + 0.131 * B), 255),
    A,
  ]);
};

var invert = function () {
  filter((R, G, B, A) => [255 - R, 255 - G, 255 - B, A]);
};

var grayscale = function () {
  filter((R, G, B, A) => {
    const avg = (R + G + B) / 3;
    return [avg, avg, avg, A];
  });
};

const inputs = document.querySelectorAll('[name=color]');
for (const input of inputs) {
  input.addEventListener('change', function (evt) {
    switch (evt.target.value) {
      case 'inverted':
        return invert();
      case 'grayscale':
        return grayscale();
      case 'sepia':
        return sepia();
      default:
        return original();
    }
  });
}

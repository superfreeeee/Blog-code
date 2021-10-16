var img = new Image();
img.src = 'https://mdn.mozillademos.org/files/5397/rhino.jpg';
img.onload = function () {
  draw(this);
};

function draw(img) {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  img.style.display = 'none';
  var zoomctx = document.getElementById('zoom').getContext('2d');

  var smoothbtn = document.getElementById('smoothbtn');
  var toggleSmoothing = function (event) {
    zoomctx.imageSmoothingEnabled = this.checked;
    zoomctx.mozImageSmoothingEnabled = this.checked;
    zoomctx.webkitImageSmoothingEnabled = this.checked;
    zoomctx.msImageSmoothingEnabled = this.checked;
  };
  smoothbtn.addEventListener('change', toggleSmoothing);

  var zoom = function (event) {
    var x = event.layerX;
    var y = event.layerY;
    zoomctx.drawImage(canvas, Math.abs(x - 5), Math.abs(y - 5), 10, 10, 0, 0, 200, 200);
  };

  canvas.addEventListener('mousemove', zoom);
}

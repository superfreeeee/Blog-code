const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

var x = 0;
function drawIt() {
  var canvas = document.getElementById('canvas');
  var c = canvas.getContext('2d');
  c.fillStyle = 'red';
  c.fillRect(x, 100, 200, 100);
  x += 5;
  if (x < 300) {
    requestAnimationFrame(drawIt);
  }
}
requestAnimationFrame(drawIt);

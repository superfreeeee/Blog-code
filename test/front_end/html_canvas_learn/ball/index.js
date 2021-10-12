const canvas = document.querySelector('#canvas');
const c = canvas.getContext('2d');

const drawCircle = (c, x, y, r, color) => {
  const originFillStyle = c.fillStyle;
  color && (c.fillStyle = color);

  c.beginPath();
  c.arc(x, y, r, 0, Math.PI * 2, true);
  c.closePath();
  c.fill();

  c.fillStyle = originFillStyle;
};

const ball = {
  x: 100,
  y: 100,
  vx: 5,
  vy: 2,
  radius: 25,
  color: 'blue',
  draw() {
    const { x, y, radius, color } = this;
    drawCircle(c, x, y, radius, color);
  },
  clearLast() {
    const { width, height } = canvas;
    c.fillStyle = `rgba(255,255,255,0.3)`;
    c.fillRect(0, 0, width, height);
  },
  move() {
    this.clearLast();

    const { x, y, vx, vy } = this;
    this.x = x + vx;
    this.y = y + vy;
    // this.vy *= 0.98;
    // this.vy += 0.2;

    this.draw();
  },
  put(x, y) {
    this.clearLast();

    this.x = x;
    this.y = y;

    this.draw();
  },
};

let raf;
let clicked = false;

function keepMoving() {
  ball.move();
  const { x, y, radius } = ball;
  (x - radius <= 0 || x + radius >= canvas.width) && (ball.vx = -ball.vx);
  (y - radius <= 0 || y + radius >= canvas.height) && (ball.vy = -ball.vy);

  cancelAnimationFrame(raf);
  raf = requestAnimationFrame(keepMoving);
}

function stopMoving() {
  cancelAnimationFrame(raf);
  raf = null;
}

ball.draw();

canvas.addEventListener('mousemove', (e) => {
  if (raf) {
    return;
  }
  const { clientX, clientY } = e;
  ball.put(clientX, clientY);
});
canvas.addEventListener('click', keepMoving);
canvas.addEventListener('mouseout', stopMoving);

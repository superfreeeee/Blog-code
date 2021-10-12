window.addEventListener('load', () => {
  const canvas = document.querySelector('#cw');
  const ctx = canvas.getContext('2d');

  const m = {
    x: innerWidth / 2,
    y: innerHeight / 2,
  };

  const points = [];

  function createPoints() {
    Array.from({ length: 100 }, () => {
      points.push(new Point(ctx, m, m.x, m.y, 4, 0.02));
    });
  }

  function resize() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    canvas.width = innerWidth;
    canvas.height = innerHeight;
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  function init() {
    resize();

    window.addEventListener('resize', resize);

    document.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      m.x = clientX;
      m.y = clientY;
    });

    createPoints();
    animeLoop();
  }

  function animeLoop() {
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    const { width, height } = canvas;
    ctx.fillRect(0, 0, width, height);
    points.forEach((point) => point.draw());
    requestAnimationFrame(animeLoop);
  }

  init();
});

class Point {
  ctx; // canvas 2D Context
  mouse; // 鼠标
  // 当前中心
  x;
  y;
  r;
  s;
  d;
  // 颜色
  color;
  theta;

  constructor(ctx, mouse, x, y, r, s, d) {
    this.ctx = ctx;
    this.mouse = mouse;

    this.x = x;
    this.y = y;
    this.r = r;
    this.s = s;
    this.d = Math.random() * 150;
    this.color = randomColor();

    this.theta = Math.random() * Math.PI * 2;
  }

  draw() {
    const { ctx, mouse, x, y, r, s, d, color, theta } = this;
    const newTheta = (this.theta = theta + s);
    const newX = (this.x = mouse.x + Math.cos(newTheta) * d);
    const newY = (this.y = mouse.y + Math.sin(newTheta) * d);

    ctx.beginPath();
    ctx.lineWidth = r;
    ctx.strokeStyle = color;
    ctx.moveTo(x, y);
    ctx.lineTo(newX, newY);
    ctx.stroke();
    ctx.closePath();
  }
}

function randomColor() {
  const R = Math.floor(Math.random() * 255);
  const G = Math.floor(Math.random() * 255);
  const B = Math.floor(Math.random() * 255);
  return `rgb(${R},${G},${B})`;
}

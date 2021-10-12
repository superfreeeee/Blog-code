const canvas = document.querySelector('#tutorial');
const ctx = canvas.getContext('2d');

/**
 * 0. reset
 */
function resetCanvas() {
  ctx.fillStyle = '#000';
  ctx.strokeStyle = '#000';
  ctx.globalAlpha = 1;
  ctx.lineWidth = 1;
  ctx.lineCap = 'butt';
  // 6.
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.shadowBlur = 0;
  ctx.shadowColor = 'rgba(0, 0, 0, 0)';
  // 8.
  ctx.font = '10px sans-serif';
  ctx.textAlign = 'start';
  ctx.textBaseline = 'alphabetic';
  ctx.direction = 'inherit';

  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

const resetBtn = document.querySelector('.switch .reset');
resetBtn.addEventListener('click', resetCanvas);
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    e.preventDefault();
    resetCanvas();
  }
});

/**
 * 0.1 basic
 */
function drawBasic() {
  ctx.fillStyle = 'rgb(200,0,0)';
  ctx.fillRect(10, 10, 55, 50);

  ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
  ctx.fillRect(30, 30, 55, 50);
}

const basicBtn = document.querySelector('.switch .basic');
basicBtn.addEventListener('click', drawBasic);

/**
 * 1.
 */
function drawRect() {
  ctx.fillRect(25, 25, 100, 100);
  ctx.clearRect(45, 45, 60, 60);
  ctx.strokeRect(50, 50, 50, 50);
}

const rectBtn = document.querySelector('.switch .rect');
rectBtn.addEventListener('click', drawRect);

/**
 * 2.
 */
function drawPath() {
  ctx.beginPath();
  ctx.moveTo(75, 50);
  ctx.lineTo(100, 75);
  ctx.lineTo(100, 25);
  ctx.fill();
}

const pathBtn = document.querySelector('.switch .path');
pathBtn.addEventListener('click', drawPath);

function drawFace() {
  ctx.beginPath();
  ctx.arc(75, 75, 50, 0, Math.PI * 4, true); // 绘制
  ctx.moveTo(110, 75);
  ctx.arc(75, 75, 35, 0, Math.PI, false); // 口(顺时针)
  ctx.moveTo(65, 65);
  ctx.arc(60, 65, 5, 0, Math.PI * 2, true); // 左眼
  ctx.moveTo(95, 65);
  ctx.arc(90, 65, 5, 0, Math.PI * 2, true); // 右眼
  ctx.stroke();
}

const pathBtn2 = document.querySelector('.switch .path2');
pathBtn2.addEventListener('click', drawFace);

function drawLine() {
  // 填充三角形
  ctx.beginPath();
  ctx.moveTo(25, 25);
  ctx.lineTo(105, 25);
  ctx.lineTo(25, 105);
  ctx.fill();

  // 描边三角形
  ctx.beginPath();
  ctx.moveTo(125, 125);
  ctx.lineTo(125, 45);
  ctx.lineTo(45, 125);
  ctx.closePath();
  ctx.stroke();
}

const pathBtn3 = document.querySelector('.switch .path3');
pathBtn3.addEventListener('click', drawLine);

function drawArc() {
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 3; j++) {
      ctx.beginPath();
      var x = 25 + j * 50; // x 坐标值
      var y = 25 + i * 50; // y 坐标值
      var radius = 20; // 圆弧半径
      var startAngle = 0; // 开始点
      var endAngle = Math.PI + (Math.PI * j) / 2; // 结束点
      var anticlockwise = i % 2 == 0 ? false : true; // 顺时针或逆时针

      ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);

      if (i > 1) {
        ctx.fill();
      } else {
        ctx.stroke();
      }
    }
  }
}

const pathBtn4 = document.querySelector('.switch .path4');
pathBtn4.addEventListener('click', drawArc);

function drawCurve() {
  // 二次贝塞尔曲线
  ctx.beginPath();
  ctx.moveTo(75, 25);
  ctx.quadraticCurveTo(25, 25, 25, 62.5);
  ctx.quadraticCurveTo(25, 100, 50, 100);
  ctx.quadraticCurveTo(50, 120, 30, 125);
  ctx.quadraticCurveTo(60, 120, 65, 100);
  ctx.quadraticCurveTo(125, 100, 125, 62.5);
  ctx.quadraticCurveTo(125, 25, 75, 25);
  ctx.stroke();

  //三次贝塞尔曲线
  ctx.beginPath();
  ctx.moveTo(75, 40);
  ctx.bezierCurveTo(75, 37, 70, 25, 50, 25);
  ctx.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
  ctx.bezierCurveTo(20, 80, 40, 102, 75, 120);
  ctx.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
  ctx.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
  ctx.bezierCurveTo(85, 25, 75, 37, 75, 40);
  ctx.fill();
}

const pathBtn5 = document.querySelector('.switch .path5');
pathBtn5.addEventListener('click', drawCurve);

function drawPath2D() {
  var rectangle = new Path2D();
  rectangle.rect(10, 10, 50, 50);

  var circle = new Path2D();
  circle.moveTo(125, 35);
  circle.arc(100, 35, 25, 0, 2 * Math.PI);

  ctx.stroke(rectangle);
  ctx.fill(circle);
}

const path2DBtn = document.querySelector('.switch .path2D');
path2DBtn.addEventListener('click', drawPath2D);

/**
 * app: Ghost
 */
function drawGhost() {
  roundedRect(ctx, 12, 12, 164, 164, 15);
  roundedRect(ctx, 19, 19, 150, 150, 9);
  roundedRect(ctx, 53, 53, 49, 33, 10);
  roundedRect(ctx, 53, 119, 49, 16, 6);
  roundedRect(ctx, 135, 53, 49, 33, 10);
  roundedRect(ctx, 135, 119, 25, 49, 10);

  ctx.beginPath();
  ctx.arc(37, 37, 13, Math.PI / 7, -Math.PI / 7, false);
  ctx.lineTo(31, 37);
  ctx.fill();

  for (var i = 0; i < 8; i++) {
    ctx.fillRect(51 + i * 16, 35, 4, 4);
  }

  for (i = 0; i < 6; i++) {
    ctx.fillRect(115, 51 + i * 16, 4, 4);
  }

  for (i = 0; i < 8; i++) {
    ctx.fillRect(51 + i * 16, 99, 4, 4);
  }

  ctx.beginPath();
  ctx.moveTo(83, 116);
  ctx.lineTo(83, 102);
  ctx.bezierCurveTo(83, 94, 89, 88, 97, 88);
  ctx.bezierCurveTo(105, 88, 111, 94, 111, 102);
  ctx.lineTo(111, 116);
  ctx.lineTo(106.333, 111.333);
  ctx.lineTo(101.666, 116);
  ctx.lineTo(97, 111.333);
  ctx.lineTo(92.333, 116);
  ctx.lineTo(87.666, 111.333);
  ctx.lineTo(83, 116);
  ctx.fill();

  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.moveTo(91, 96);
  ctx.bezierCurveTo(88, 96, 87, 99, 87, 101);
  ctx.bezierCurveTo(87, 103, 88, 106, 91, 106);
  ctx.bezierCurveTo(94, 106, 95, 103, 95, 101);
  ctx.bezierCurveTo(95, 99, 94, 96, 91, 96);
  ctx.moveTo(103, 96);
  ctx.bezierCurveTo(100, 96, 99, 99, 99, 101);
  ctx.bezierCurveTo(99, 103, 100, 106, 103, 106);
  ctx.bezierCurveTo(106, 106, 107, 103, 107, 101);
  ctx.bezierCurveTo(107, 99, 106, 96, 103, 96);
  ctx.fill();

  ctx.fillStyle = 'black';
  ctx.beginPath();
  ctx.arc(101, 102, 2, 0, Math.PI * 2, true);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(89, 102, 2, 0, Math.PI * 2, true);
  ctx.fill();

  function roundedRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x, y + radius);
    ctx.lineTo(x, y + height - radius);
    ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
    ctx.lineTo(x + width - radius, y + height);
    ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
    ctx.lineTo(x + width, y + radius);
    ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
    ctx.lineTo(x + radius, y);
    ctx.quadraticCurveTo(x, y, x, y + radius);
    ctx.stroke();
  }
}

const ghostBtn = document.querySelector('.switch .ghost');
ghostBtn.addEventListener('click', drawGhost);

/**
 * 3.
 */
function drawColor(stroke = false) {
  const width = 50;
  const radius = width / 2 - 10;
  for (var i = 0; i < 6; i++) {
    for (var j = 0; j < 6; j++) {
      const c1 = Math.floor(255 - (255 / 6) * i);
      const c2 = Math.floor(255 - (255 / 6) * j);
      if (!stroke) {
        ctx.fillStyle = `rgb(${c1},${c2},0)`;
        ctx.fillRect(j * width, i * width, width, width);
      } else {
        ctx.strokeStyle = `rgb(0,${c1},${c2})`;
        ctx.beginPath();
        ctx.arc(width / 2 + j * width, width / 2 + i * width, radius, 0, Math.PI * 2, true);
        ctx.stroke();
      }
    }
  }
}

const colorBtn = document.querySelector('.switch .color');
colorBtn.addEventListener('click', () => drawColor());
const colorBtn2 = document.querySelector('.switch .color2');
colorBtn2.addEventListener('click', () => drawColor(true));

function drawTransparency() {
  const width = 150;

  // 画背景
  ctx.fillStyle = '#FD0';
  ctx.fillRect(0, 0, width, width);
  ctx.fillStyle = '#6C0';
  ctx.fillRect(width, 0, width, width);
  ctx.fillStyle = '#09F';
  ctx.fillRect(0, width, width, width);
  ctx.fillStyle = '#F30';
  ctx.fillRect(width, width, width, width);

  // 设置透明度值
  ctx.fillStyle = '#FFF';
  ctx.globalAlpha = 0.2;

  // 画半透明圆
  for (var i = 0; i < 7; i++) {
    ctx.beginPath();
    ctx.arc(width, width, 20 + 20 * i, 0, Math.PI * 2, true);
    ctx.fill();
  }
}

const transBtn = document.querySelector('.switch .transparency');
transBtn.addEventListener('click', drawTransparency);

function drawTransparency2() {
  const width = 300;

  // 画背景
  ctx.fillStyle = 'rgb(255,221,0)';
  ctx.fillRect(0, 0, width, width / 4);
  ctx.fillStyle = 'rgb(102,204,0)';
  ctx.fillRect(0, width / 4, width, width / 4);
  ctx.fillStyle = 'rgb(0,153,255)';
  ctx.fillRect(0, width / 2, width, width / 4);
  ctx.fillStyle = 'rgb(255,51,0)';
  ctx.fillRect(0, (width * 3) / 4, width, width / 4);

  // 画半透明矩形
  const padding = 10;
  const blockWidth = (width - padding) / 10;
  const blockHeight = width / 4 - padding;
  for (var i = 0; i < 10; i++) {
    ctx.fillStyle = 'rgba(255,255,255,' + (i + 1) / 10 + ')';
    for (var j = 0; j < 4; j++) {
      ctx.fillRect(padding / 2 + i * blockWidth, padding / 2 + j * (blockHeight + padding), blockWidth, blockHeight);
    }
  }
}

const transBtn2 = document.querySelector('.switch .transparency2');
transBtn2.addEventListener('click', drawTransparency2);

/**
 * 4.
 */
function drawLineWidth() {
  for (var i = 0; i < 10; i++) {
    ctx.lineWidth = 1 + i;
    ctx.beginPath();
    ctx.moveTo(5 + i * 14, 5);
    ctx.lineTo(5 + i * 14, 140);
    ctx.stroke();
  }
}

const lineWidthBtn = document.querySelector('.switch .lineWidth');
lineWidthBtn.addEventListener('click', drawLineWidth);

function drawLineCap() {
  var lineCap = ['butt', 'round', 'square'];

  const offset = 30;
  const width = 300;

  // 创建路径
  ctx.strokeStyle = '#09f';
  ctx.beginPath();
  ctx.moveTo(offset, offset);
  ctx.lineTo(width - offset, offset);
  ctx.moveTo(offset, width - offset);
  ctx.lineTo(width - offset, width - offset);
  ctx.stroke();

  // 画线条
  ctx.strokeStyle = 'black';
  for (var i = 0; i < lineCap.length; i++) {
    const lineWidth = (ctx.lineWidth = offset);
    ctx.lineCap = lineCap[i];
    ctx.beginPath();
    ctx.moveTo(offset + lineWidth + (i * (width - (offset + lineWidth) * 2)) / 2, offset);
    ctx.lineTo(offset + lineWidth + (i * (width - (offset + lineWidth) * 2)) / 2, width - offset);
    ctx.stroke();
  }
}

const lineCapBtn = document.querySelector('.switch .lineCap');
lineCapBtn.addEventListener('click', drawLineCap);

function drawLineJoin() {
  var lineJoin = ['round', 'bevel', 'miter'];
  const width = (ctx.lineWidth = 20);
  for (var i = 0; i < lineJoin.length; i++) {
    ctx.lineJoin = lineJoin[i];
    ctx.beginPath();
    ctx.moveTo(-5, 5 + i * width * 4);
    ctx.lineTo(-5 + width * 2, 5 + width * 4 + i * width * 4);
    ctx.lineTo(-5 + width * 4, 5 + i * width * 4);
    ctx.lineTo(-5 + width * 6, 5 + width * 4 + i * width * 4);
    ctx.lineTo(-5 + width * 8, 5 + i * width * 4);
    ctx.lineTo(-5 + width * 10, 5 + width * 4 + i * width * 4);
    ctx.lineTo(-5 + width * 12, 5 + i * width * 4);
    ctx.lineTo(-5 + width * 14, 5 + width * 4 + i * width * 4);
    ctx.lineTo(-5 + width * 16, 5 + i * width * 4);
    ctx.stroke();
  }
}

const lineJoinBtn = document.querySelector('.switch .lineJoin');
lineJoinBtn.addEventListener('click', drawLineJoin);

let offset = 0,
  timer = null;
function drawAnt() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.setLineDash([4, 2]);
  ctx.lineDashOffset = -offset;
  ctx.strokeRect(10, 10, 100, 100);
}

function antAnime() {
  offset = (offset + 1) % 24;
  drawAnt();
  timer = setTimeout(antAnime, 100);
}
function clearAnime() {
  clearTimeout(timer);
}

const antBtn = document.querySelector('.switch .ant');
antBtn.addEventListener('click', () => {
  clearAnime();
  antAnime();
});
const antBtn2 = document.querySelector('.switch .ant2');
antBtn2.addEventListener('click', clearAnime);

/**
 * 5.
 */
function drawLinearGradient() {
  // Create gradients
  var lingrad = ctx.createLinearGradient(0, 0, 0, 150);
  lingrad.addColorStop(0, '#00ABEB');
  lingrad.addColorStop(0.5, '#fff');
  lingrad.addColorStop(0.5, '#26C000');
  lingrad.addColorStop(1, '#fff');

  var lingrad2 = ctx.createLinearGradient(0, 50, 0, 95);
  lingrad2.addColorStop(0.5, '#000');
  lingrad2.addColorStop(1, 'rgba(0,0,0,0)');

  // assign gradients to fill and stroke styles
  ctx.fillStyle = lingrad;
  ctx.strokeStyle = lingrad2;

  // draw shapes
  ctx.fillRect(10, 10, 130, 130);
  ctx.strokeRect(50, 50, 50, 50);
}

const lgBtn = document.querySelector('.switch .lg');
lgBtn.addEventListener('click', drawLinearGradient);

function drawRadialGradient() {
  // 创建渐变
  var radgrad = ctx.createRadialGradient(45, 45, 10, 52, 50, 30);
  radgrad.addColorStop(0, '#A7D30C');
  radgrad.addColorStop(0.9, '#019F62');
  radgrad.addColorStop(1, 'rgba(1,159,98,0)');

  var radgrad2 = ctx.createRadialGradient(105, 105, 20, 112, 120, 50);
  radgrad2.addColorStop(0, '#FF5F98');
  radgrad2.addColorStop(0.75, '#FF0188');
  radgrad2.addColorStop(1, 'rgba(255,1,136,0)');

  var radgrad3 = ctx.createRadialGradient(95, 15, 15, 102, 20, 40);
  radgrad3.addColorStop(0, '#00C9FF');
  radgrad3.addColorStop(0.8, '#00B5E2');
  radgrad3.addColorStop(1, 'rgba(0,201,255,0)');

  var radgrad4 = ctx.createRadialGradient(0, 150, 50, 0, 140, 90);
  radgrad4.addColorStop(0, '#F4F201');
  radgrad4.addColorStop(0.8, '#E4C700');
  radgrad4.addColorStop(1, 'rgba(228,199,0,0)');

  const radgrad5 = ctx.createRadialGradient(75, 75, 5, 75, 75, 25);
  radgrad5.addColorStop(0, '#000');
  radgrad5.addColorStop(0.7, '#777');
  radgrad5.addColorStop(1, '#fff');

  // 画图形
  ctx.fillStyle = radgrad5;
  ctx.fillRect(0, 0, 150, 150);
  ctx.fillStyle = radgrad4;
  ctx.fillRect(0, 0, 150, 150);
  ctx.fillStyle = radgrad3;
  ctx.fillRect(0, 0, 150, 150);
  ctx.fillStyle = radgrad;
  ctx.fillRect(0, 0, 150, 150);
  ctx.fillStyle = radgrad2;
  ctx.fillRect(0, 0, 150, 150);
}

const rgBtn = document.querySelector('.switch .rg');
rgBtn.addEventListener('click', drawRadialGradient);

function drawPattern() {
  // 创建新 image 对象，用作图案
  var img = new Image();
  img.src = 'https://mdn.mozillademos.org/files/222/Canvas_createpattern.png';
  img.onload = function () {
    // 创建图案
    var ptrn = ctx.createPattern(img, 'repeat');
    ctx.fillStyle = ptrn;
    ctx.fillRect(0, 0, 150, 150);
  };
}

const patternBtn = document.querySelector('.switch .pattern');
patternBtn.addEventListener('click', drawPattern);

// 6.
function drawShadow() {
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  ctx.shadowBlur = 2;
  ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';

  ctx.font = '20px Times New Roman';
  ctx.fillStyle = 'Black';
  ctx.fillText('Sample String', 5, 30);
}

const shadowBtn = document.querySelector('.switch .shadow');
shadowBtn.addEventListener('click', drawShadow);

function drawFillRule() {
  ctx.beginPath();
  ctx.arc(50, 50, 30, 0, Math.PI * 2, true);
  ctx.arc(50, 50, 15, 0, Math.PI * 2, true);
  ctx.fill('evenodd');
}

const fillRuleBtn = document.querySelector('.switch .fillRule');
fillRuleBtn.addEventListener('click', drawFillRule);

/**
 * 7.
 */
function drawText() {
  ctx.font = '48px serif';
  ctx.fillText('Hello world', 10, 50);
  ctx.font = '48px serif';
  ctx.strokeText('Hello world', 10, 100);
}

const textBtn = document.querySelector('.switch .text');
textBtn.addEventListener('click', drawText);

/**
 * 8.
 */
function drawTextBaseline() {
  ctx.font = '48px serif';

  const lines = [
    { y: 10, baseline: 'top' },
    { y: 60, baseline: 'hanging' },
    { y: 110, baseline: 'middle' },
    { y: 160, baseline: 'alphabetic' },
    { y: 210, baseline: 'ideographic' },
    { y: 260, baseline: 'bottom' },
  ];

  lines.forEach(({ y, baseline }, i) => {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(250, y);
    ctx.stroke();

    ctx.textBaseline = baseline;
    ctx.strokeText('Hello world' + (i + 1), 0, y);
  });
}

const tbBtn = document.querySelector('.switch .tb');
tbBtn.addEventListener('click', drawTextBaseline);

function drawMeasureText() {
  const text = 'foo';
  var measurement = ctx.measureText(text); // TextMetrics object
  measurement.width; // 16;
  ctx.font = '48px serif';
  ctx.fillText(text, 10, 100);
}

const measureBtn = document.querySelector('.switch .measure');
measureBtn.addEventListener('click', drawMeasureText);

/**
 * 9.
 */
function drawImage() {
  const img = new Image();
  img.onload = function () {
    ctx.drawImage(img, 0, 0);
    ctx.beginPath();
    ctx.moveTo(30, 96);
    ctx.lineTo(70, 66);
    ctx.lineTo(103, 76);
    ctx.lineTo(170, 15);
    ctx.stroke();
  };
  img.src = 'https://mdn.mozillademos.org/files/5395/backdrop.png';
}

const imgBtn = document.querySelector('.switch .img');
imgBtn.addEventListener('click', drawImage);

function drawImageRepeat() {
  var img = new Image();
  const width = 300 / 3;
  const height = 300 / 4;
  img.onload = function () {
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 3; j++) {
        ctx.drawImage(img, j * width, i * height, width, height);
      }
    }
  };
  img.src = 'https://mdn.mozillademos.org/files/5397/rhino.jpg';
}

const imgBtn2 = document.querySelector('.switch .img2');
imgBtn2.addEventListener('click', drawImageRepeat);

function loadImg(src, width, height) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    width && (img.width = width);
    height && (img.height = height);
    img.onload = function () {
      resolve(img);
    };
    img.onerror = function (err) {
      reject(err);
    };
    img.src = src;
  });
}

const rhinoImageSrc = 'https://mdn.mozillademos.org/files/5397/rhino.jpg';
const frameImageSrc = 'https://mdn.mozillademos.org/files/242/Canvas_picture_frame.png';

async function drawImageFrame() {
  const rhinoImg = await loadImg(rhinoImageSrc);
  const frameImg = await loadImg(frameImageSrc);

  ctx.drawImage(rhinoImg, 33, 71, 104, 124, 21, 20, 87, 104);
  ctx.drawImage(frameImg, 0, 0);
}

const imgBtn3 = document.querySelector('.switch .img3');
imgBtn3.addEventListener('click', drawImageFrame);

/**
 * 10.
 */
function* drawState() {
  ctx.fillRect(0, 0, 150, 150); // 使用默认设置绘制一个矩形
  ctx.save(); // 保存默认状态

  yield;

  ctx.fillStyle = '#09F'; // 在原有配置基础上对颜色做改变
  ctx.fillRect(15, 15, 120, 120); // 使用新的设置绘制一个矩形

  yield;

  ctx.save(); // 保存当前状态
  ctx.fillStyle = '#FFF'; // 再次改变颜色配置
  ctx.globalAlpha = 0.5;
  ctx.fillRect(30, 30, 90, 90); // 使用新的配置绘制一个矩形

  yield;

  ctx.restore(); // 重新加载之前的颜色状态
  ctx.fillRect(45, 45, 60, 60); // 使用上一次的配置绘制一个矩形

  yield;

  ctx.restore(); // 加载默认颜色配置
  ctx.fillRect(60, 60, 30, 30); // 使用加载的配置绘制一个矩形
}

function genLoop(generator, showReturn = false) {
  let gen = generator();

  const next = () => {
    const res = gen.next();
    showReturn && console.log('res', res);
    if (res.done) {
      gen = generator();
    }
  };

  return next;
}

const stateBtn = document.querySelector('.switch .state');
stateBtn.addEventListener('click', genLoop(drawState));

function* drawTranslate() {
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      ctx.save();
      ctx.fillStyle = 'rgb(' + 51 * i + ', ' + (255 - 51 * i) + ', 255)';
      ctx.translate(10 + j * 50, 10 + i * 50);
      ctx.fillRect(0, 0, 25, 25);
      ctx.restore();

      yield [i, j];
    }
  }
}

const translateBtn = document.querySelector('.switch .trans');
translateBtn.addEventListener('click', genLoop(drawTranslate, true));

function drawRotate() {
  const width = 300;

  ctx.save();
  ctx.translate(width / 2, width / 2);

  for (var i = 1; i < 6; i++) {
    // Loop through rings (from inside to out)
    ctx.save();
    const R = 51 * i;
    const G = 255 - R;
    ctx.fillStyle = `rgb(${R},${G},255)`;

    for (var j = 0; j < i * 6; j++) {
      // draw individual dots
      ctx.rotate((Math.PI * 2) / (i * 6));
      ctx.beginPath();
      ctx.arc(0, i * 25, 10, 0, Math.PI * 2, true);
      ctx.fill();
    }

    ctx.restore();
  }
  ctx.restore();
}

const rotateBtn = document.querySelector('.switch .rotate');
rotateBtn.addEventListener('click', drawRotate);

function drawScale() {
  // draw a simple rectangle, but scale it.
  ctx.save();
  ctx.scale(10, 3);
  ctx.fillRect(1, 10, 10, 10);
  ctx.restore();

  // mirror horizontally
  ctx.save();
  ctx.scale(-1, 1);
  ctx.font = '48px serif';
  ctx.fillText('MDN', -135, 120);
  ctx.restore();
}

const scaleBtn = document.querySelector('.switch .scale');
scaleBtn.addEventListener('click', drawScale);

function drawTransform() {
  var sin30 = Math.sin(Math.PI / 6);
  var cos30 = Math.cos(Math.PI / 6);

  ctx.save();
  ctx.translate(100, 100);
  var c = 0;
  for (var i = 0; i <= 12; i++) {
    ctx.fillStyle = `rgba(0,0,0,${1 - i / 12})`;
    ctx.fillRect(0, 0, 100, 10);
    ctx.transform(cos30, sin30, -sin30, cos30, 0, 0);
  }

  ctx.setTransform(-1, 0, 0, 1, 100, 100);
  ctx.fillStyle = 'rgba(255, 128, 255, 0.5)';
  ctx.fillRect(0, 50, 100, 100);
  ctx.restore();
}

const transformBtn = document.querySelector('.switch .transform');
transformBtn.addEventListener('click', drawTransform);

/**
 * 11.
 */
function drawClip() {
  const width = 300;

  ctx.fillRect(0, 0, width, width);
  ctx.save();
  ctx.translate(width / 2, width / 2);

  // Create a circular clipping path
  ctx.beginPath();
  ctx.arc(0, 0, (width * 2) / 5, 0, Math.PI * 2, true);
  ctx.clip();

  // draw background
  var lingrad = ctx.createLinearGradient(0, -width / 2, 0, width / 2);
  lingrad.addColorStop(0, '#232256');
  lingrad.addColorStop(1, '#143778');

  ctx.fillStyle = lingrad;
  ctx.fillRect(-width / 2, -width / 2, width, width);

  // draw stars
  for (var j = 1; j < 50; j++) {
    ctx.save();
    ctx.fillStyle = '#fff';
    ctx.translate(width / 2 - randInt(width), width / 2 - randInt(width));
    drawStar(ctx, randInt(8) + 4);
    ctx.restore();
  }
  ctx.restore();

  function randInt(max) {
    return Math.floor(Math.random() * max);
  }

  function drawStar(ctx, r) {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(r, 0);

    const tan54 = Math.tan((Math.PI * 2) / 5);
    // const isFat = Math.random() > 0.5;
    const isFat = false;
    for (var i = 0; i < 9; i++) {
      ctx.rotate(Math.PI / 5);
      if (i % 2 == 0) {
        if (isFat) {
          ctx.lineTo((r / 2) * tan54, 0);
        } else {
          ctx.lineTo(r * 0.38196530164666, 0);
        }
      } else {
        ctx.lineTo(r, 0);
      }
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}

const clipBtn = document.querySelector('.switch .clip');
clipBtn.addEventListener('click', drawClip);

function drawAnime() {
  var sun = new Image();
  var moon = new Image();
  var earth = new Image();

  function init() {
    sun.src = 'https://mdn.mozillademos.org/files/1456/Canvas_sun.png';
    moon.src = 'https://mdn.mozillademos.org/files/1443/Canvas_moon.png';
    earth.src = 'https://mdn.mozillademos.org/files/1429/Canvas_earth.png';
    window.requestAnimationFrame(draw);
  }

  const deg360 = 2 * Math.PI;

  function draw() {
    ctx.globalCompositeOperation = 'destination-over';
    ctx.clearRect(0, 0, 300, 300); // clear canvas

    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.strokeStyle = 'rgba(0,153,255,0.4)';
    ctx.save();
    ctx.translate(150, 150);

    // Earth
    var time = new Date();
    const sec = time.getSeconds();
    const ms = time.getMilliseconds();
    const degEarth = deg360 * (sec / 60 + ms / 60000);
    ctx.rotate(degEarth);
    ctx.translate(105, 0);
    ctx.fillRect(0, -12, 50, 24); // Shadow
    ctx.drawImage(earth, -12, -12);

    // Moon
    const degMoon = deg360 * (sec / 6 + ms / 6000);
    ctx.save();
    ctx.rotate(degMoon);
    ctx.translate(0, 28.5);
    ctx.drawImage(moon, -3.5, -3.5);
    ctx.restore();

    ctx.restore();

    ctx.beginPath();
    ctx.arc(150, 150, 105, 0, Math.PI * 2, false); // Earth orbit
    ctx.stroke();

    ctx.drawImage(sun, 0, 0, 300, 300);

    window.requestAnimationFrame(draw);
  }

  init();
}

const animeBtn = document.querySelector('.switch .anime');
animeBtn.addEventListener('click', drawAnime);

function drawClock() {
  function clock() {
    var now = new Date();
    ctx.save();
    ctx.clearRect(0, 0, 150, 150);
    ctx.translate(75, 75);
    ctx.scale(0.4, 0.4);
    ctx.rotate(-Math.PI / 2);
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'white';
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';

    // Hour marks
    ctx.save();
    for (var i = 0; i < 12; i++) {
      ctx.beginPath();
      ctx.rotate(Math.PI / 6);
      ctx.moveTo(100, 0);
      ctx.lineTo(120, 0);
      ctx.stroke();
    }
    ctx.restore();

    // Minute marks
    ctx.save();
    ctx.lineWidth = 5;
    for (i = 0; i < 60; i++) {
      if (i % 5 != 0) {
        ctx.beginPath();
        ctx.moveTo(117, 0);
        ctx.lineTo(120, 0);
        ctx.stroke();
      }
      ctx.rotate(Math.PI / 30);
    }
    ctx.restore();

    var sec = now.getSeconds();
    var min = now.getMinutes();
    var hr = now.getHours();
    hr = hr >= 12 ? hr - 12 : hr;

    ctx.fillStyle = 'black';

    // write Hours
    ctx.save();
    ctx.rotate(hr * (Math.PI / 6) + (Math.PI / 360) * min + (Math.PI / 21600) * sec);
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.moveTo(-20, 0);
    ctx.lineTo(80, 0);
    ctx.stroke();
    ctx.restore();

    // write Minutes
    ctx.save();
    ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec);
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(-28, 0);
    ctx.lineTo(112, 0);
    ctx.stroke();
    ctx.restore();

    // Write seconds
    ctx.save();
    ctx.rotate((sec * Math.PI) / 30);
    ctx.strokeStyle = '#D40000';
    ctx.fillStyle = '#D40000';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(-30, 0);
    ctx.lineTo(83, 0);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(95, 0, 10, 0, Math.PI * 2, true);
    ctx.stroke();
    ctx.fillStyle = 'rgba(0,0,0,0)';
    ctx.arc(0, 0, 3, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.restore();

    ctx.beginPath();
    ctx.lineWidth = 14;
    ctx.strokeStyle = '#325FA2';
    ctx.arc(0, 0, 142, 0, Math.PI * 2, true);
    ctx.stroke();

    ctx.restore();

    setTimeout(() => {
      window.requestAnimationFrame(clock);
    }, 1000);
  }
  window.requestAnimationFrame(clock);
}

const animeBtn2 = document.querySelector('.switch .anime2');
animeBtn2.addEventListener('click', drawClock);

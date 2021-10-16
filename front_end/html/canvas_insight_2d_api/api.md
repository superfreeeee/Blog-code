```js
// 1. Rect 相关
function rect(x, y, width, height);         // 
function fillRect(x, y, width, height);     // 填充矩形
function strokeRect(x, y, width, height);   // 绘制矩形
function clearRect(x, y, width, height);    // 清空矩形
```

```js
// 2. 路径相关
function beginPath();   // 创建路径
function closePath();   // 闭合路径
function stroke();      // 绘制路径
function fill(mode?);   // 填充路径

// 2.1 直线
function moveTo(x, y);  // 移动画笔（不留下任何路径）
function lineTo(x, y);  // 直线路径

// 2.3 Path2D
class Path2D {}

// 2.4
function quadraticCurveTo(x, y, );
function bezierCurveTo();
```

```js
// 3. Colors
fillStyle = color | gradient;    // 填充颜色
strokeStyle = color | gradient;  // 线条颜色
globalAlpha = transparencyValue; // 透明度
```

```js
// 4. Line Style
lineWidth = value;  // 线条宽度
lineCap = type;     // 线条末端样式
lineJoin = type;    // 线条接合样式
miterLimit = value; // 线条交接长度
function getLineDash();         // 线条虚线样式
function setLineDash(segments); // 设置线条虚线样式
lineDashOffset = value;         // 虚线起始偏移量
```

```js
// 5. Advanced Color
function createLinearGradient(x1, y1, x2, y2);          // 线性渐变
function createRadialGradient(x1, y1, r1, x2, y2, r2);  // 辐射渐变
gradient.prototype.addColorStop = function addColorStop(position, color); // 颜色断点
function createPattern(img, mode);    // 图片填色模式
```

```js
// 6. Shadow
shadowOffsetX = float;
shadowOffsetY = float;
shadowBlur = float;
shadowColor = color;
```

```js
// 7. Text
function fillText(text, x, y , maxWidth?); 
function strokeText(text, x, y , maxWidth?); 
```

```js
// 8. Text style
font = value;
textAlign = value;
textBaseline = value;
direction = value;
function measureText(text);
``` 

```js
// 9. Image
function drawImage(image, x, y); // 绘制图片
function drawImage(image, x, y, width, height); // 缩放
function drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight); // 切片
// 缩放平滑效果
ctx.mozImageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.msImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;
```

```js
// 10. Transform
function save();    // 保存画布状态
function restore(); // 恢复画布状态
function translate(x, y); // 平移
function rotate(angle);   // 旋转
function scale(x, y);     // 缩放
function transform(a, b, c, d, e, f);       // 修改变形矩阵
function setTransform(a, b, c, d, e, f);    // 设置绝对变形
function resetTransform();                  // 重制变形
/*
[
    [a b],
    [c d],
]
*/
```

```js
// 11. Compositing
globalCompositeOperation = type; // 覆盖样式操作
function clip(); // 当前路径转为裁切路径
```

```js
// 12. Pixel
function createImageData(width, height);            // 创造数据对象
function createImageData(anotherImageData);
function getImageData(left, top, width, height);    // 获取数据对象
function putImageData(myImageData, dx, dy);         // 写入数据对象
// canvas.prototype
function toDataURL(MIME_TYPE);          // 转为数据 base64
function toDataURL(MIME_TYPE, quality);
function toBlob(callback, type, encoderOptions); // 转为 Blob
```

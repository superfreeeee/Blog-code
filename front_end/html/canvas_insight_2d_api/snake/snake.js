function tmz() {
  var e = new Date(t),
    i = new Date(),
    n = Math.abs(i.getMinutes() - e.getMinutes()),
    o = Math.abs(i.getSeconds() - e.getSeconds());
  return n + ' : ' + o;
}
function coll(t, e) {
  return t.x < e.x + e.w && t.x + t.w > e.x && t.y < e.y + e.h && t.h + t.y > e.y;
}
function snake() {
  (this.w = 15), (this.h = 15), (this.dx = 1), (this.dy = 1), (this.xf = 1), (this.yf = 1), (this.sn = []);
  for (var t = { x: w / 2, y: h / 2 }, e = 0; e < 5; e++) this.sn.push(Object.assign({}, t)), (t.x += this.w);
  this.draw = function () {
    var t = d && d.search('Arrow') > -1,
      e = -1;
    if (t) {
      var i = { ...this.sn[0] };
      const { x, y } = i;
      const { x: targetX, y: targetY } = target;
      if (Math.abs(x - targetX) > 8) {
        d = x > targetX ? 'ArrowLeft' : 'ArrowRight';
      } else if (Math.abs(y - targetY) > 8) {
        d = y > targetY ? 'ArrowUp' : 'ArrowDown';
      }
      if (
        ('ArrowUp' == d && (i.y -= this.h),
        'ArrowDown' == d && (i.y += this.h),
        'ArrowLeft' == d && (i.x -= this.w),
        'ArrowRight' == d && (i.x += this.w),
        i.x >= w ? (i.x = 0) : i.x < 0 && (i.x = w - this.w),
        i.y > h ? (i.y = 0) : i.y < 0 && (i.y = h),
        (e = fa.findIndex((t) => coll({ ...this.sn[0], h: this.h, w: this.w }, t))),
        this.sn.unshift(i,{ ...i }, { ...i }, { ...i }, { ...i }, { ...i }, { ...i }),
        -1 != e)
      )
        return (
          this.sn.unshift({ ...i }, { ...i }, { ...i }, { ...i }, { ...i }, { ...i }),
          fa[e].renew(),
          void (document.getElementById('score').innerText = Number(document.getElementById('score').innerText) + 1),
          findNearest()
        );
      this.sn.pop(), console.log(6);
    }
    this.sn.forEach((t, e, i) => {
      if (0 == e || i.length - 1 == e) {
        var n = c.createLinearGradient(t.x, t.y, t.x + this.w, t.y + this.h);
        i.length - 1 == e
          ? (n.addColorStop(0, 'black'), n.addColorStop(1, '#8BC34A'))
          : (n.addColorStop(0, '#8BC34A'), n.addColorStop(1, 'white')),
          (c.fillStyle = n);
      } else c.fillStyle = '#8BC34A';
      c.fillRect(t.x, t.y, this.w, this.h),
        (c.strokeStyle = '#E91E63'),
        (c.font = '30px serif'),
        (c.strokeStyle = '#9E9E9E'),
        i.length - 1 != e && 0 != e && c.strokeRect(t.x, t.y, this.w, this.h),
        0 == e && (c.beginPath(), (c.fillStyle = '#F44336'), c.arc(t.x + 10, t.y + 2, 5, 360, 0), c.fill()),
        c.arc(t.x + 10, t.y + 2, 5, 360, 0),
        c.fill(),
        c.beginPath();
    });
  };
}
function gc() {
  for (var t = '0123456789ABCDEF', e = '#', i = 0; i < 6; i++) e += t[Math.ceil(15 * Math.random())];
  return e;
}
function food() {
  (this.x = 0),
    (this.y = 0),
    (this.b = 10),
    (this.w = this.b),
    (this.h = this.b),
    (this.color = gc()),
    (this.renew = function () {
      (this.x = Math.floor(Math.random() * (w - 200) + 10)),
        (this.y = Math.floor(Math.random() * (h - 200) + 30)),
        (this.color = gc());
    }),
    this.renew(),
    (this.put = () => {
      (c.fillStyle = this.color),
        c.arc(this.x, this.y, this.b - 5, 0, 2 * Math.PI),
        c.fill(),
        c.beginPath(),
        c.arc(this.x, this.y, this.b - 5, 0, Math.PI),
        (c.strokeStyle = 'green'),
        (c.lineWidth = 10),
        c.stroke(),
        c.beginPath(),
        (c.lineWidth = 1);
    });
}
function init() {
  (cc.height = h), (cc.width = w), c.fillRect(0, 0, w, innerHeight);
  for (var t = 0; t < 10; t++) fa.push(new food());
  (s = new snake(w / 2, h / 2, 400, 4, 4)), anima();
  findNearest();
}
function anima() {
  (c.fillStyle = 'rgba(0,0,0,0.11)'),
    c.fillRect(0, 0, cc.width, cc.height),
    fa.forEach((t) => t.put()),
    s.draw(),
    (document.getElementById('time').innerText = tmz()),
    setTimeout(() => {
      requestAnimationFrame(anima);
    }, fw);
}
function emit(t) {
  key.keydown(t);
}
function touch(t) {
  t.classList.toggle('off'), document.getElementsByClassName('keypress')[0].classList.toggle('hide');
}
var t = new Date() + '',
  d = void 0,
  cc = document.getElementsByTagName('canvas')[0],
  c = cc.getContext('2d');
(key = {}),
  (key.keydown = function (t) {
    var e = document.createEvent('KeyboardEvent');
    Object.defineProperty(e, 'keyCode', {
      get: function () {
        return this.keyCodeVal;
      },
    }),
      Object.defineProperty(e, 'key', {
        get: function () {
          return 37 == this.keyCodeVal
            ? 'ArrowLeft'
            : 38 == this.keyCodeVal
            ? 'ArrowUp'
            : 39 == this.keyCodeVal
            ? 'ArrowRight'
            : 'ArrowDown';
        },
      }),
      Object.defineProperty(e, 'which', {
        get: function () {
          return this.keyCodeVal;
        },
      }),
      e.initKeyboardEvent
        ? e.initKeyboardEvent('keydown', !0, !0, document.defaultView, !1, !1, !1, !1, t, t)
        : e.initKeyEvent('keydown', !0, !0, document.defaultView, !1, !1, !1, !1, t, 0),
      (e.keyCodeVal = t),
      e.keyCode !== t && alert('keyCode mismatch ' + e.keyCode + '(' + e.which + ')'),
      document.dispatchEvent(e);
  });
var o,
  s,
  h = innerHeight,
  w = innerWidth,
  fw = 60,
  fa = [];
(window.onkeydown = function (t) {
  var e = t.key;
  (e.search('Arrow') > -1 || '1' == e) && (d = t.key),
    ('i' != e && 'I' != e) || (console.log('inc'), (fw -= 10)),
    ('d' != e && 'D' != e) || (console.log('dec'), (fw += 10));
}),
  init();

function findNearest() {
  // const head = s.sn[0];
  // const getD = ({ x, y }, { x: targetX, y: targetY }) => (x - targetX) * (x - targetX) + (y - targetY) * (y - targetY);
  // const dl = fa.map((f, i) => ({ i, d: getD(head, f), f, head }));
  // const index = dl.reduce((res, next) => (res.d <= next.d ? res : next)).i;
  // target = fa[index];
}
var target = fa[0];

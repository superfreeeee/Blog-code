!(function (e, t) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = t())
    : 'function' == typeof define && define.amd
    ? define([], t)
    : 'object' == typeof exports
    ? (exports.__youxiantest_pkg_2 = t())
    : (e.__youxiantest_pkg_2 = t());
})(this, function () {
  return (() => {
    var e = {
        261: function (e, t, o) {
          var n, r, i, u;
          function f(e) {
            return (
              (f =
                'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                  ? function (e) {
                      return typeof e;
                    }
                  : function (e) {
                      return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype
                        ? 'symbol'
                        : typeof e;
                    }),
              f(e)
            );
          }
          (e = o.nmd(e)),
            (u = function () {
              return (function () {
                'use strict';
                var e = {
                    d: function (t, o) {
                      for (var n in o)
                        e.o(o, n) && !e.o(t, n) && Object.defineProperty(t, n, { enumerable: !0, get: o[n] });
                    },
                    o: function (e, t) {
                      return Object.prototype.hasOwnProperty.call(e, t);
                    },
                    r: function (e) {
                      'undefined' != typeof Symbol &&
                        Symbol.toStringTag &&
                        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
                        Object.defineProperty(e, '__esModule', { value: !0 });
                    },
                  },
                  t = {};
                e.r(t),
                  e.d(t, {
                    greetingPkg1: function () {
                      return o;
                    },
                  });
                var o = function () {
                  console.log('invoke greetingPkg1 from @youxiantest/pkg-1');
                };
                return t;
              })();
            }),
            'object' == f(t) && 'object' == f(e)
              ? (e.exports = u())
              : ((r = []), void 0 === (i = 'function' == typeof (n = u) ? n.apply(t, r) : n) || (e.exports = i));
        },
      },
      t = {};
    function o(n) {
      var r = t[n];
      if (void 0 !== r) return r.exports;
      var i = (t[n] = { id: n, loaded: !1, exports: {} });
      return e[n].call(i.exports, i, i.exports, o), (i.loaded = !0), i.exports;
    }
    (o.n = (e) => {
      var t = e && e.__esModule ? () => e.default : () => e;
      return o.d(t, { a: t }), t;
    }),
      (o.d = (e, t) => {
        for (var n in t) o.o(t, n) && !o.o(e, n) && Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
      }),
      (o.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
      (o.r = (e) => {
        'undefined' != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
          Object.defineProperty(e, '__esModule', { value: !0 });
      }),
      (o.nmd = (e) => ((e.paths = []), e.children || (e.children = []), e));
    var n = {};
    return (
      (() => {
        'use strict';
        o.r(n), o.d(n, { greetingPkg2: () => t });
        var e = o(261),
          t = function () {
            (0, e.greetingPkg1)('@youxiantest/pkg-2'), console.log('invoke greetingPkg2 from @youxiantest/pkg-2');
          };
      })(),
      n
    );
  })();
});

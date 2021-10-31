E.prototype = {
  // ...

  off: function (name, callback) {
    var e = this.e || (this.e = {});
    var evts = e[name];
    var liveEvents = [];
  
    if (evts && callback) {
      for (var i = 0, len = evts.length; i < len; i++) {
        if (evts[i].fn !== callback && evts[i].fn._ !== callback)
          liveEvents.push(evts[i]);
      }
    }
  
    (liveEvents.length)
      ? e[name] = liveEvents
      : delete e[name];
  
    return this;
  }
  
  // ...
};

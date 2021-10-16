window.requestAnimationFrame = (function () {
  console.log('window.requestAnimationFrame', window.requestAnimationFrame);
  console.log('window.webkitRequestAnimationFrame', window.webkitRequestAnimationFrame);
  console.log('window.mozRequestAnimationFrame', window.mozRequestAnimationFrame);
  console.log('window.oRequestAnimationFrame', window.oRequestAnimationFrame);
  console.log('window.msRequestAnimationFrame', window.msRequestAnimationFrame);
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();

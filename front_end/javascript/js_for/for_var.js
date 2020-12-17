for (var i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i)
  }, 0)
}

for (var i = 0; i < 5; i++) {
  (function (i) {
    setTimeout(function () {
      console.log(i)
    }, 0)
  }(i))
}

for (let i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i)
  }, 0)
}

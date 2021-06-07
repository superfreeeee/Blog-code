var cb = window.onload || function() {}
window.onload = function () {
  cb()
  console.log('sample3: import at the end of <body>')

  console.log(document.querySelector('h1'))
}

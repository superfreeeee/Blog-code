function group(tag, cb) {
  console.group(tag)
  cb()
  console.groupEnd()
}

$(document).ready(function () {
  console.log('document ready')
})

$(function () {
  console.log('docuemnt ready 2')
})

$(window).on('load', function () {
  console.log('window load')
})

$(function () {
  group('test proto', () => {
    console.log($('h1'))

    console.log($('h1').__proto__)
    console.log($('h1').__proto__ === $.fn)
  })

  group('test attr getter/setter', () => {
    const link1 = $('a')

    console.log('link1', link1)
    console.log("link1.attr('href'): ", link1.attr('href'))
    console.log("link1.attr('href', '#789'): ", link1.attr('href', '#789'))
  })
})

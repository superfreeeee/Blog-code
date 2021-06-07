/**
 * * require module
 */
define(['require', 'js/other.js'], function (require, other) {
  'use strict'
  console.log('other', other)

  const other2 = require('js/other.js')
  console.log('other2', other2)
  console.log('other === other2:', other === other2)
})

/*!
 * then-write-json <https://github.com/tunnckoCore/then-write-json>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var writeFile = require('then-write-file')
var stringifyJson = require('then-stringify-json')

module.exports = function thenWriteJson (fp, content) {
  if (typeof fp !== 'string') {
    throw new TypeError('then-write-json expect `fp` be string')
  }

  return stringifyJson(content).then(function (res) {
    return writeFile(fp, res)
  })
}

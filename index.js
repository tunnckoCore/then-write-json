/*!
 * then-write-json <https://github.com/tunnckoCore/then-write-json>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var fs = require('mz/fs')
var path = require('path')
var stringifyJson = require('then-stringify-json')

module.exports = function thenWriteJson (fp, content, opts) {
  if (typeof fp !== 'string') {
    throw new TypeError('then-write-json expect `fp` be string')
  }
  opts = opts || {}

  return stringifyJson(content).then(function (res) {
    var dir = path.resolve(path.dirname(fp))

    return fs.exists(dir).then(function (exist) {
      if (!exist) {
        return fs.mkdir(dir).then(function () {
          fp = path.resolve(fp)
          return writeFile(fp, res)
        })
      }
      var filepath = path.resolve(fp)
      return fs.exists(filepath).then(function (exist) {
        if (exist) {
          var err = new Error('EEXIST, already exists "' + fp + '"')
          err.code = 'EEXIST'
          throw err
        }
        return writeFile(filepath, res)
      })
    })
  })
}

function writeFile (fp, res) {
  return fs.writeFile(fp, res).then(function () {
    return true
  })
}

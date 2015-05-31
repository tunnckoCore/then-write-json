/*!
 * then-write-json <https://github.com/tunnckoCore/then-write-json>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

var test = require('assertit')
var thenWriteJson = require('./index')

test('then-write-json:', function () {
  test('should throw TypeError if `fp` is not string', function (done) {
    function fixture () {
      thenWriteJson(12345)
    }

    test.throws(fixture, TypeError)
    test.throws(fixture, /then-write-json expect `fp` be string/)
    done()
  })
  test('should write stringified `content` to file', function (done) {
    var promise = thenWriteJson('./foobar.json', {foo: 'bar'})

    promise.then(function (res) {
      test.equal(res, true)
      done()
    })
  })
  test('should write file and create directory', function (done) {
    var promise = thenWriteJson('./fixture/foobar.json', {foo: 'bar'})

    promise.then(function (res) {
      test.equal(res, true)
      done()
    })
  })
  test('should catch error if file exists', function (done) {
    var promise = thenWriteJson('./foobar.json', {foo: 'bar'})

    promise.catch(function (err) {
      test.ifError(!err)
      test.equal(err.code, 'EEXIST')
      test.equal(err.message, 'EEXIST, already exists "./foobar.json"')
      done()
    })
  })
  test('should catch error if directory exists', function (done) {
    var promise = thenWriteJson('./node_modules', {foo: 'bar'})

    promise.catch(function (err) {
      test.ifError(!err)
      test.equal(err.code, 'EEXIST')
      test.equal(err.message, 'EEXIST, already exists "./node_modules"')
      done()
    })
  })
})

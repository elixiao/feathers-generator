#!/usr/bin/env node
/* eslint no-console: 0 */

const fs = require('fs')
const createService = require('../lib/service')
const createApp = require('../lib/app')

const input = process.argv[2], args = process.argv.slice(3)
if (input) {
  if (!fs.existsSync('package.json')) return console.log('Could not find a valid package.json')
  let names = input.split('.'), model = names[0], action = names[1]
  if (names.length > 2) return console.log('invalid model name!')
  createService(model, action, args)
} else {
  fs.readdir(process.cwd(), function (err, fileArr) {
    if (fileArr.length) {
      console.log('folder is not empty!')
    } else {
      createApp()
    }
  })
}

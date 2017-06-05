#!/usr/bin/env node

/* eslint no-console: 0 */

const create = require('../lib')
const fs = require('fs')

if (!fs.existsSync('package.json')) return console.log('Could not find a valid package.json')
const input = process.argv[2], args = process.argv.slice(3)
if (!input) return console.log('model name is required!')
let names = input.split('.'), model = names[0], action = names[1]
if (names.length > 2) return console.log('invalid model name!')

create(model, action, args)

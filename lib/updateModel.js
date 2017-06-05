/* eslint no-console: 0 */

const fs = require('fs')
const path = require('path')
const utils = require('./utils')

module.exports = function () {
  const cwd = process.cwd()
  const json = fs.readFileSync('package.json')
  let lines = [], dest = 'src/models/index.js', separator = ~json.indexOf('\r\n') ? '\r\n' : '\n'
  let paginate = '{default:20,max:50}'
  let configPath = path.resolve(cwd, 'config/default.json')
  if (fs.existsSync(configPath)) paginate = require(configPath).paginate

  try {
    let files = fs.readdirSync('src/models')
    let arr = []
    let models = files
      .filter(it => ~it.indexOf('.model.js'))
      .map(it => {
        let s = it.slice(0, it.indexOf('.'))
        let name = utils.capitalize(utils.camelize(s))
        arr.push(name)
        return `exports.${name} = require('./${s}.model')`
      })

    if (fs.existsSync(dest)) {
      let oldFile = fs.readFileSync(dest, 'utf8')
      lines = oldFile.split(separator).filter(it => {
        let regex = /(^exports\..+=.+require\('\.\/.+\.model'\))|(^exports\.paginate)/
        return !regex.test(it.trim())
      })
    }
    const p = 'exports.paginate = ' + JSON.stringify(paginate).replace(/"/g, '').replace(/([:,])/g, '$1 ')
    models = models.concat([p]).concat(lines).join(separator)
    fs.writeFileSync(dest, models)
    console.log('models/index.js\x1b[32m update success\x1b[0m')
  }
  catch (e) {
    console.log('models/index.js\x1b[31m update failed\x1b[0m', e)
  }
}

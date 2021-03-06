/* eslint no-console: 0 */

const fs = require('fs')
const path = require('path')
const utils = require('./utils')
const update = require('./update')
const cwd = process.cwd()

module.exports = function (model, action, args) {

  let force = args.includes('force'),
    nodb = action || args.includes('nodb'),
    nopre = args.includes('nopre'),
    url = args.filter(it => it.includes('path='))[0],
    srcDir = path.join(cwd, 'src'),
    servicesDir = path.join(srcDir, 'services'),
    feathersPath = path.join(servicesDir, 'feathers.class.js'),
    modelsDir = path.join(srcDir, 'models'),
    modelDir = path.join(cwd, 'src/services', model),
    actionDir = path.join(modelDir, `${model}-${action}`),
    name = `${model}-${action}`

  if (!fs.existsSync(srcDir)) fs.mkdirSync(srcDir)
  if (!fs.existsSync(servicesDir)) fs.mkdirSync(servicesDir)
  if (!fs.existsSync(modelsDir)) fs.mkdirSync(modelsDir)
  if (!fs.existsSync(feathersPath)) {
    fs.writeFileSync(feathersPath, fs.readFileSync(__dirname + '/../scaffold/feathers.class.js', 'utf8'))
    console.log('feathers.class.js \x1b[32mcreated\x1b[0m')
  }

  if (!nodb) create('model')
  create('class')
  create('service')
  create('hooks')

  function create(type) {
    try {
      if (!fs.existsSync(path.join(cwd, 'src'))) fs.mkdirSync(modelDir)
      if (!fs.existsSync(modelDir)) fs.mkdirSync(modelDir)
      let data = getTemplate(type)
      if (url) data = data.replace(/books/g, url.split('=')[1])
      data = data.replace(/\.\/book\./g, `./${model}.`)
        .replace(/book/g, utils.camelize(model))
        .replace(/Book/g, utils.capitalize(utils.camelize(model)))

      if (action) {
        data = data.replace(/sort/g, action).replace(/Sort/g, utils.capitalize(action))
        if (nopre) {
          actionDir = path.join(modelDir, `${action}`)
          name = action
          let regex = new RegExp(`${model}-`, 'g')
          data = data.replace(regex, '')
        }
        if (!fs.existsSync(actionDir)) fs.mkdirSync(actionDir)
      } else {
        action = ''
        actionDir = modelDir
        name = `${model}`
        data = data.replace(/sort/g, '').replace(/Sort/g, '')
        let r1 = new RegExp(`${model}-`, 'g')
        data = data.replace(r1, model).replace(/\/'/g, '\'').replace('../../../', '../../')
      }

      if (type === 'model') actionDir = path.join(cwd, 'src/models')
      let filename = `${name}.${type}.js`, file = path.join(actionDir, filename)
      if (fs.existsSync(file) && !force) return console.log(`${filename} \x1b[31malready exists\x1b[0m`)
      let stats = fs.lstatSync(actionDir)
      if (!stats.isDirectory()) return console.log('wrong model！')
      fs.writeFileSync(file, data)
      console.log(`${filename} \x1b[32mcreated\x1b[0m`)
      if (type === 'service') update(model)
    } catch (e) {
      console.log('something is wrong', e)
    }
  }

  function getTemplate(type) {
    if (nodb && type === 'class') type += '.nodb'
    const file = path.join(__dirname, '../scaffold', `${type}.js`)
    return fs.readFileSync(file, 'utf8')
  }
}

/* eslint no-console: 0 */

const fs = require('fs')

module.exports = function (model) {
  const json = fs.readFileSync('package.json')
  let dest = 'src/services/index.js', separator = ~json.indexOf('\r\n') ? '\r\n' : '\n'
  try {
    if (fs.existsSync(dest)) {
      const lines = fs.readFileSync(dest, 'utf8').split(separator)
      const n1 = lines.findIndex(it => it.startsWith('module.exports'))
      lines.splice(n1, 0, `const book = require('./book/book.service')`.replace(/book/g, model))
      const n2 = lines.findIndex(it => it.startsWith('}'))
      lines.splice(n2, 0, `  app.configure(book)`.replace('book', model))
      const text = lines.join(separator)
      fs.writeFileSync(dest, text)
      console.log('services/index.js\x1b[32m update success\x1b[0m')
    }
  }
  catch (e) {
    console.log('services/index.js\x1b[31m update failed\x1b[0m', e)
  }
}

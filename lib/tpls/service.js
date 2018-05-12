const BookSort = require('./book-sort.class')
const hooks = require('./book-sort.hooks')

module.exports = function () {
  const app = this
  app.use('/books/sort', BookSort)
  const service = app.service('books/sort')
  service.hooks(hooks)
}

const BookSort = require('./book-sort.class')
const hooks = require('./book-sort.hooks')
const filters = require('./book-sort.filters')

module.exports = function () {
  const app = this
  app.use('/books/sort', BookSort)
  const service = app.service('books/sort')
  service.hooks(hooks)
  if (service.filter) {
    service.filter(filters)
  }
}

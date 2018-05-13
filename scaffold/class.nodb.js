const Feathers = require('../../feathers.class')

class BookSort {
  constructor(options) {
    this.options = options || {}
  }

  find(params) {
    return Promise.resolve()
  }

  get(id, params) {
    return Promise.resolve()
  }

  create(data, params) {
    return Promise.resolve()
  }

  patch(id, data, params) {
    return Promise.resolve()
  }

  remove(id, params) {
    return Promise.resolve()
  }
}

const BookSortInstance = new BookSort({
  paginate: Feathers.paginate
})

module.exports = BookSortInstance

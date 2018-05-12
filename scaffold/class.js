const Feathers = require('../feathers.class')
const BookModel = require('../../models/book.model')

class Book extends Feathers {
  find(params) {
    return super.find(params)
  }

  get(id, params) {
    return super.get(id, params)
  }

  create(data, params) {
    return super.create(data, params)
  }

  patch(id, data, params) {
    return super.patch(id, data, params)
  }

  remove(id, params) {
    return super.remove(id, params)
  }
}

const BookInstance = new Book({
  name: 'book',
  Model: BookModel,
  paginate: Feathers.paginate
})

module.exports = BookInstance

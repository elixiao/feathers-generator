const Feathers = require('../feathers.class')
const Model = require('../../models')

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
  Model: Model.Book,
  paginate: Model.paginate
})

module.exports = BookInstance

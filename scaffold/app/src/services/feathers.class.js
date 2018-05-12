const FeathersMongoose = require('feathers-mongoose').Service

class Feathers extends FeathersMongoose {

  // GET /models
  find(params) {
    return super.find(params)
  }

  // GET /models/<id>
  get(id, params) {
    return super.get(id, params)
  }

  // POST /models
  create(data, params) {
    return super.create(data, params).then(it => {
      if (params && params.query) {
        return params.query.$populate ? this.get(it, params) : it
      }
      return it
    })
  }

  // PUT /models[/<id>]
  update(id, data, params) {
    return super.update(id, data, params)
  }

  // PATCH /models[/<id>]
  patch(id, data, params) {
    return super.patch(id, data, params)
  }

  // DELETE /models[/<id>]
  remove(id, params) {
    if (id !== null) {
      params.query = {
        [this.id]: id
      }
    }
    return super.remove(id, params)
  }

}
Feathers.paginate = {default: 50, max: 200}
module.exports = Feathers

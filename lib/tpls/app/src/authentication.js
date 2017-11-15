const authentication = require('feathers-authentication')
const jwt = require('feathers-authentication-jwt')
const local = require('feathers-authentication-local')

module.exports = function () {
  const app = this
  const config = app.get('authentication')

  app.configure(authentication(config))
  app.configure(jwt())
  app.configure(local())

  app.service('authentication').hooks({
    before: {
      create: [
        authentication.hooks.authenticate(['jwt', 'local'])
      ],
      remove: [
        authentication.hooks.authenticate('jwt')
      ]
    },
    after: {
      create: []
    },
    error: {
      create: []
    }
  })
}

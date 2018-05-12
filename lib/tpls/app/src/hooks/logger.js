const logger = require('winston')

module.exports = function () {
  return context => {
    logger.debug(`${context.type} app.service('${context.path}').${context.method}()`)
    if (typeof context.toJSON === 'function') {
      logger.debug('Hook Context', JSON.stringify(context, null, '  '))
    }
    if (context.error) {
      logger.error(context.error)
    }
  }
}

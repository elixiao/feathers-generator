exports.paginate = {
  default: 50,
  max: 100
}

exports.getModel = function (name) {
  let capitalizedName = name.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())
  return exports[capitalizedName] || exports[capitalizedName.slice(0, capitalizedName.length - 1)]
}

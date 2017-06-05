exports.capitalize = input => input.charAt(0).toUpperCase() + input.slice(1)
exports.decapitalize = input => input.charAt(0).toLowerCase() + input.slice(1)
exports.camelize = input => input.split('-').map((it, i) => i ? exports.capitalize(it) : exports.decapitalize(it)).join('')

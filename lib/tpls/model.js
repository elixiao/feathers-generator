const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const Model = mongoose.model('book', new Schema({
  text: {type: String, required: true},
}, {timestamps: true}))

module.exports = Model

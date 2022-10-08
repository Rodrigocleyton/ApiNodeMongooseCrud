const mongoose = require('mongoose')

const Person = new mongoose.model('Person', {
    name: String,
    salary: Number,
    aprroved: Boolean

})

module.exports= Person
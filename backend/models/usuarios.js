const mongoose = require('mongoose')


const UsuarioSchema = new mongoose.Schema({
    nombre: {type: String, require: true},
    correo: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    fechaRegistro:{type: Date, default:Date.now},
})

module.exports = mongoose.model('Usuario', UsuarioSchema)
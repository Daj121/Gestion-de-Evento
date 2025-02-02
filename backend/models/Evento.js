const mongoose = require('mongoose');

const EventoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    fecha: { type: Date, required: true },
    hora: { type: String, required: true },
    ubicacion: { type: String, required: true },
    descripcion: { type: String, required: true },
    usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
});

module.exports = mongoose.model('Evento', EventoSchema);
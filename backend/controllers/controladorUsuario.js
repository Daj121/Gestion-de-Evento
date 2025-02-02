const Usuario = require('../models/usuarios'); // Asegúrate de que el modelo está bien escrito

// Crear usuario
exports.crearUsuario = async (req, res) => {
    try {
        const nuevoUsuario = new Usuario(req.body);
        await nuevoUsuario.save();
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear el usuario', error: error.message });
    }
};

// Obtener todos los usuarios
exports.obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los usuarios', error: error.message });
    }
};

// Actualizar usuario
exports.actualizarUsuario = async (req, res) => {
    try {
        const usuarioActualizado = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!usuarioActualizado) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        res.status(200).json(usuarioActualizado);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar el usuario', error: error.message });
    }
};

// Eliminar usuario
exports.eliminarUsuario = async (req, res) => {
    try {
        const usuarioEliminado = await Usuario.findByIdAndDelete(req.params.id);
        if (!usuarioEliminado) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        res.status(200).json({ mensaje: 'Usuario eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar al usuario', error: error.message });
    }
};

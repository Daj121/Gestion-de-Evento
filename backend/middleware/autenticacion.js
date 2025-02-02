const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuarios');

const autenticacion = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log('Token no recibido:', authHeader); 
        return res.status(401).json({ mensaje: 'No autorizado, token faltante' });
    }

    const token = authHeader.split(' ')[1];

    try {
        console.log('Token recibido:');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await Usuario.findById(decoded.id).select('-password');

        if (!req.user) {
            console.log('Usuario no encontrado en la BD');
            return res.status(401).json({ mensaje: 'Usuario no encontrado' });
        }

        console.log('Usuario autenticado:');
        next();
    } catch (error) {
        console.log('Error en el token:', error.message);
        return res.status(401).json({ mensaje: 'Token inválido' });
    }
};

module.exports = autenticacion;

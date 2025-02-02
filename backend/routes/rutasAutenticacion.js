const express = require('express');
const router = express.Router();
const controladorAutenticacion = require('../controllers/controladorAutenticacion');


// Rutas de autenticacion
router.post('/registrar', controladorAutenticacion.registrarUsuario);
router.post('/iniciar', controladorAutenticacion.iniciarSesion);

module.exports = router;
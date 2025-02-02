const express = require('express');
const controladorEvento = require('../controllers/controladorEvento');
const autenticacion = require('../middleware/autenticacion')
const router = express.Router();


router.post('/', autenticacion,controladorEvento.agregarEvento);

router.get('/', autenticacion,controladorEvento.obtenerEvento);

router.put('/:id', autenticacion,controladorEvento.actualizarEvento);

router.delete('/:id', autenticacion,controladorEvento.eliminarEvento);

module.exports = router;

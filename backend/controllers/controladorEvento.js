const Evento = require('../models/Evento');

// Agregar un evento
exports.agregarEvento = async (req, res) => {
  try {
      if (!req.user || !req.user.id) {
          return res.status(401).json({ mensaje: 'Usuario no autenticado' });
      }

      const nuevoEvento = new Evento({ ...req.body, usuarioId: req.user.id });
      await nuevoEvento.save();
      res.status(201).json(nuevoEvento);
  } catch (error) {
      res.status(500).json({ mensaje: 'Error al crear el evento', error: error.message });
  }
};


// Obtener eventos con filtros opcionales
exports.obtenerEvento = async (req, res) => {
  try {
    const { fecha, ubicacion } = req.query;
    const filters = { usuarioId: req.user.id };

    if (fecha) filters.date = date;
    if (ubicacion) filters.ubicacion = ubicacion;

    const events = await Evento.find(filters);
    res.json(events);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Actualizar un evento
exports.actualizarEvento = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEvent = await Evento.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedEvent) return res.status(404).json({ error: 'Evento no encontrado' });

    res.json(updatedEvent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Eliminar un evento
exports.eliminarEvento = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEvent = await Evento.findByIdAndDelete(id);

    if (!deletedEvent) return res.status(404).json({ error: 'Evento no encontrado' });

    res.json({ message: 'Evento eliminado correctamente' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

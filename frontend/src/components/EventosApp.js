import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
    Container,
    TextField,
    Button,
    List,
    IconButton,
    Typography,
    Box,
    Paper
} from "@mui/material";

const TarjetaEvento = ({ evento, onEdit, onDelete }) => (
  <Paper 
    elevation={2}
    className="p-6 mb-6 bg-white"
  >
    <Box className="space-y-3">
      <Typography className="font-bold text-lg">
        Evento: {evento.nombre}
      </Typography>
      <Typography className="mt-2">
        Ubicación: {evento.ubicacion}
      </Typography>
      <Typography className="mt-2">
        Hora: {evento.hora}
      </Typography>
      <Typography className="mt-2">
        Fecha: {evento.fecha?.split('T')[0]}
      </Typography>
      <Typography className="mt-2">
        Descripción: {evento.descripcion}
      </Typography>
      <Box className="mt-4 flex justify-end space-x-3">
        <IconButton size="small" onClick={() => onEdit(evento)} color="primary">
          <FaEdit />
        </IconButton>
        <IconButton size="small" onClick={() => onDelete(evento._id)} color="error">
          <FaTrash />
        </IconButton>
      </Box>
    </Box>
  </Paper>
);

const EventosApp = () => {
    const [eventos, setEventos] = useState([]);
    const [eventoActual, setEventoActual] = useState(null);
    const [nuevoEvento, setNuevoEvento] = useState({
        nombre: "",
        fecha: "",
        hora: "",
        ubicacion: "",
        descripcion: ""
    });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/registrar");
        } else {
            obtenerEventos();
        }
    }, [navigate]);

    const obtenerEventos = async () => {
        try {
            const respuesta = await api.get("/evento");
            setEventos(respuesta.data);
        } catch (error) {
            console.error("Error al obtener eventos", error);
        }
    };

    const manejarCambio = (e) => {
        setNuevoEvento({ ...nuevoEvento, [e.target.name]: e.target.value });
    };

    const agregarEvento = async () => {
        try {
            if (eventoActual) {
                await api.put(`/evento/${eventoActual._id}`, nuevoEvento);
                setEventoActual(null);
            } else {
                await api.post("/evento", nuevoEvento);
            }
            obtenerEventos();
            setNuevoEvento({ nombre: "", fecha: "", hora: "", ubicacion: "", descripcion: "" });
        } catch (error) {
            console.error("Error al agregar o actualizar evento", error);
        }
    };

    const editarEvento = (evento) => {
        setNuevoEvento({
            nombre: evento.nombre,
            fecha: evento.fecha ? evento.fecha.split("T")[0] : "",
            hora: evento.hora ? evento.hora.substring(0, 5) : "",
            ubicacion: evento.ubicacion,
            descripcion: evento.descripcion
        });
        setEventoActual(evento);
    };

    const eliminarEvento = async (id) => {
        try {
            await api.delete(`/evento/${id}`);
            obtenerEventos();
        } catch (error) {
            console.error("Error al eliminar evento", error);
        }
    };

    return (
        <Container className="py-12">
            <Typography variant="h4" className="mb-8 font-bold">Gestión de Eventos</Typography>
            
            <Box className="space-y-5 mb-2 bg-gray-5 p-5 rounded-lg">
                <TextField 
                    label="Nombre" 
                    name="nombre" 
                    value={nuevoEvento.nombre} 
                    onChange={manejarCambio} 
                    fullWidth
                    className="bg-white"
                />
                <TextField 
                    label="Fecha" 
                    name="fecha" 
                    type="date" 
                    value={nuevoEvento.fecha} 
                    onChange={manejarCambio} 
                    fullWidth 
                    InputLabelProps={{ shrink: true }}
                    className="bg-white" 
                />
                <TextField 
                    label="Hora" 
                    name="hora" 
                    type="time" 
                    value={nuevoEvento.hora} 
                    onChange={manejarCambio} 
                    fullWidth 
                    InputLabelProps={{ shrink: true }}
                    className="bg-white" 
                />
                <TextField 
                    label="Ubicación" 
                    name="ubicacion" 
                    value={nuevoEvento.ubicacion} 
                    onChange={manejarCambio} 
                    fullWidth
                    className="bg-white"
                />
                <TextField 
                    label="Descripción" 
                    name="descripcion" 
                    value={nuevoEvento.descripcion} 
                    onChange={manejarCambio} 
                    fullWidth 
                    multiline 
                    rows={3}
                    className="bg-white"
                />
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={agregarEvento} 
                    className="mt-6"
                    fullWidth
                >
                    {eventoActual ? "Actualizar Evento" : "Agregar Evento"}
                </Button>
            </Box>

            <List className="space-y-6">
                {eventos.map(evento => (
                    <TarjetaEvento
                        key={evento._id}
                        evento={evento}
                        onEdit={editarEvento}
                        onDelete={eliminarEvento}
                    />
                ))}
            </List>
        </Container>
    );
};

export default EventosApp;
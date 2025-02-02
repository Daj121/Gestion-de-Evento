import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import api from "../api/axiosConfig";
import { Container, TextField, Button, Typography } from "@mui/material";

const RegistroUsuario = () => {
    const [nuevoUsuario, setNuevoUsuario] = useState({
        nombre: "",
        correo: "",
        password: ""
    });
    const [mensaje, setMensaje] = useState("");
    const navigate = useNavigate(); // Hook para redirigir

    const handleChange = (e) => {
        setNuevoUsuario({ ...nuevoUsuario, [e.target.name]: e.target.value });
    };

    const handleRegistro = async () => {
        try {
            await api.post("/autenticacion/registrar", nuevoUsuario);
            setMensaje("Registro exitoso. Redirigiendo a inicio de sesión...");
            setTimeout(() => navigate("/iniciar"), 1000); // Redirige después de 1 segundos
        } catch (error) {
            setMensaje("Error en el registro");
            console.error("Error al registrar usuario", error);
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Registro de Usuario</Typography>
            <TextField label="Nombre" name="nombre" value={nuevoUsuario.nombre} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="Correo" name="correo" value={nuevoUsuario.correo} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="Contraseña" name="password" type="password" value={nuevoUsuario.password} onChange={handleChange} fullWidth margin="normal" />
            <Button variant="contained" color="primary" onClick={handleRegistro} sx={{ mt: 2 }}>Registrarse</Button>
            {mensaje && <Typography sx={{ mt: 2 }}>{mensaje}</Typography>}
        </Container>
    );
};

export default RegistroUsuario;

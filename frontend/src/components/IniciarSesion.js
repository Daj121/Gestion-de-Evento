import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import { Container, TextField, Button, Typography } from "@mui/material";

const IniciarSesion = () => {
    const [credenciales, setCredenciales] = useState({ correo: "", password: "" });
    const [mensaje, setMensaje] = useState("");
    const navigate = useNavigate(); // Hook para redirigir

    const handleChange = (e) => {
        setCredenciales({ ...credenciales, [e.target.name]: e.target.value });
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://localhost:5000/api/autenticacion/iniciar", credenciales);
            localStorage.setItem("token", response.data.token);
            setTimeout(() => navigate("/eventos"), 1000);
            setMensaje("inicio de sesion exitosa. Redirigiendo a Eventos.....");
        } catch (error) {
            setMensaje("Error en la autenticación");
            console.error("Error al iniciar sesión", error);
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Autenticación de Usuario</Typography>
            <TextField label="Correo" name="correo" value={credenciales.correo} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="Contraseña" name="password" type="password" value={credenciales.password} onChange={handleChange} fullWidth margin="normal" />
            <Button variant="contained" color="primary" onClick={handleLogin} sx={{ mt: 2 }}>Iniciar Sesión</Button>
            {mensaje && <Typography sx={{ mt: 2 }}>{mensaje}</Typography>}
        </Container>
    );
};

export default IniciarSesion;

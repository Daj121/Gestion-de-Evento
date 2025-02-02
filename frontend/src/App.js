import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import EventosApp from "./components/EventosApp";
import RegistrarUsuario from "./components/RegistroUsuario";
import IniciarSesion from "./components/IniciarSesion";
import { Container, AppBar, Toolbar, Button } from "@mui/material";

const App = () => {
    const isAuthenticated = !!localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/iniciar";
    };

    return (
        <Router>
            <Container>
                <AppBar position="static">
                    <Toolbar>
                        <Button color="inherit" href="/"></Button>
                        <Button color="inherit" href="/registrar">Registrar</Button>
                        {!isAuthenticated ? (
                            <Button color="inherit" href="/iniciar">Iniciar Sesión</Button>
                        ) : (
                            <Button color="inherit" onClick={handleLogout}>Cerrar Sesión</Button>
                        )}
                    </Toolbar>
                </AppBar>
                <Routes>
                    <Route path="/eventos" element={<EventosApp />} />
                    <Route path="/registrar" element={<RegistrarUsuario />} />
                    <Route path="/iniciar" element={<IniciarSesion />} />
                    <Route path="/" element={<Navigate replace to="/registrar" />} />
                </Routes>
            </Container>
        </Router>
    );
};

export default App;

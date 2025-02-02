import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api",
});

// Interceptor para adjuntar el token en cada solicitud
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token"); // Obtiene el token del almacenamiento local
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;

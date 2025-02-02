# Gestion de Eventos
## Tecnologias Utilizadas

### Frontend:
- React.js
- React Router
- Material-UI
- Axios
- React Icons

### Backend:
- Node.js
- Express.js
- MongoDB con Mongoose
- JWT (JSON Web Tokens) para autenticacion

## Instalacion

### 1. Clonar el repositorio
```bash
 git clone https://github.com/tu-usuario/Gestion-de-Eventos.git
```

### 2. Configurar el backend
```bash
 cd backend
 npm install
```

Crear un archivo `.env` con las siguientes variables de entorno:
```env
PORT=5000
MONGO_URI=tu_conexion_mongodb
JWT_SECRET=una_clave_secreta
```

Iniciar el servidor:
```bash
 npm start
```

### 3. Configurar el frontend
```bash
 cd ../frontend
 npm install
```

Iniciar el frontend:
```bash
 npm start
```

## Uso
1. Registrarse como usuario.
2. Iniciar sesion con las credenciales.
3. Agregar eventos con nombre, fecha, hora, ubicacion y descripcion.
4. Editar o eliminar eventos existentes.

## Endpoints API

### **Autenticacion**
- `POST /api/autenticacion/registro` - Registrar usuario
- `POST /api/autenticacion/iniciar` - Iniciar sesion

### **Eventos**
- `GET /api/evento` - Obtener eventos del usuario
- `POST /api/evento` - Crear evento
- `PUT /api/evento/:id` - Editar evento
- `DELETE /api/evento/:id` - Eliminar evento


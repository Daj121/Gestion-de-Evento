const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const conectarBD = require('./config/baseDato')

dotenv.config()

const app = express()

app.use(express.json())
conectarBD()

app.use(cors({ origin: 'http://localhost:3000' }));

app.use('/api/autenticacion', require('./routes/rutasAutenticacion'))
app.use('/api/Evento', require('./routes/rutaEvento'))
app.use('/api/usuario', require('./routes/rutasUsuario'))

app.use((req, res, next)=>{
    res.status(404).json({mensaje: 'Ruta no encontrada'})
})


app.use((error, req, res,next)=>{
    console.error(error.stack)
    res.status(500).json({mensaje: 'error en el servidor', error: error.message})
});


// Servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));




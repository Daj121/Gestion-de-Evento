const Usuario = require('../models/usuarios');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")

// Clave secreta para firmar el JWT
const JWT_SECRET = process.env.JWT_SECRET || 'clave_secreta_para_jwt'

// Registrar un nuevo usuario
exports.registrarUsuario = async (req, res) =>{
    try{
        const {nombre, correo, password} = req.body;
        
        // Verificar si el correo ya está registrado
        const usuarioExistente = await Usuario.findOne({ correo });
        if(usuarioExistente){
            return res.status(400).json({ mensaje: 'El correo ya está en uso' });
        }

        // Encriptar la contraseña
        const passwordEncriptado = await bcrypt.hash(password, 10);

        // crear un nuevo usuario
        const nuevoUsuario = new Usuario({
            nombre,
            correo,
            password: passwordEncriptado,
            
        });

        await nuevoUsuario.save();
        res.status(201).json({ mensaje: 'Usuario registrado con exito'});
    } catch (error){
        res.status(500).json({mensaje:'Error al registrar el usuario',error: error.message});
    }
};

// Iniciar sesion de un usuario
exports.iniciarSesion = async (req, res) => {
    try{
        const { correo, password } = req.body;

        // verificar si el usuario existe
        const usuario = await Usuario.findOne({correo});
        if(!usuario) {
            return res.status(400).json({mensaje: 'correo o contraseña incorrectos'});
        }

        // verificar la contraseña
        const esPasswordValido = await bcrypt.compare(password, usuario.password);
        if (!esPasswordValido) {
            return res.status(400).json({mensaje: 'correo o contraseña incorrectos'});
        }

        // Crear el token JWT
        const token = jwt.sign({id: usuario._id, rol: usuario.rol}, JWT_SECRET, {expiresIn: '1h' })
        console.log('Token generado:', token);

        res.status(200).json({mensaje: 'Inicio de sesion exitoso', token });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al iniciar session', error: error.message});
    }
}
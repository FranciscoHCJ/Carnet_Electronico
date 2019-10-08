"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Usuario_1 = __importDefault(require("../models/Usuario"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// ===================================
// Obtener todos los Usuarios
// ===================================
exports.todos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Filtramos los datos que necesitamos recuperar a excepcion del folio
    const usuarios = yield Usuario_1.default.find({}, 'nombre apellido email direccion telefono').exec();
    res.status(200).json({
        ok: true,
        usuarios: usuarios
    });
});
// ===================================
// Crear nuevo Usuario
// ===================================
exports.registro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Creando un nuevo usuario
    const usuarios = new Usuario_1.default({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        folio: req.body.folio,
        direccion: req.body.direccion,
        telefono: req.body.telefono
    });
    // Encryptamos el folio
    usuarios.folio = yield usuarios.encryptFolio(usuarios.folio);
    // Guardamos el nuevo usuario
    const usuario = yield usuarios.save((err, usuarioGuardado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al crear usuario',
                errors: err
            });
        }
        // Creando token
        const token = jsonwebtoken_1.default.sign({ _id: usuarioGuardado._id }, process.env.TOKEN_SECRET || 'tokenTest');
        // Respuesta que devolvemos al Cliente que realizo la petición
        res.header('auth-token', token).status(201).json({
            ok: true,
            usuario: usuarioGuardado
        });
    });
});
// ===================================
// Actualizar un Usuario
// ===================================
exports.update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var id = req.params.id;
    var body = req.body;
    yield Usuario_1.default.findById(id, (err, usuario) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario'
            });
        }
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El usuario con el id' + id + ' no existe',
                errors: { message: 'No existe un usuario con ese ID' }
            });
        }
        usuario.nombre = body.nombre;
        usuario.apellido = body.apellido;
        usuario.email = body.email;
        usuario.direccion = body.direccion;
        usuario.telefono = body.telefono;
        usuario.save((err, usuarioGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Erro al actualizar usuario',
                    errors: err
                });
            }
            usuarioGuardado.folio = ':)';
            res.status(200).json({
                ok: true,
                usuario: usuarioGuardado
            });
        });
    });
});
// ===================================
// Borrar un Usuario por id
// ===================================
exports.eliminar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var id = req.params.id;
    yield Usuario_1.default.findByIdAndDelete(id, (err, usuarioBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar usuario',
                errors: err
            });
        }
        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un usuario con ese ID',
                errors: { message: 'No existe un usuario con ese ID' }
            });
        }
        res.status(200).json({
            ok: true,
            usuario: usuarioBorrado
        });
    });
});
// ===================================
// Iniciar Sesión
// ===================================
exports.login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Buscamos al usuario registrado en la bd
    const usuario = yield Usuario_1.default.findOne({ email: req.body.email });
    // Sino existe retornamos un mensaje de error
    if (!usuario)
        return res.status(400).json('Email ó folio es incorrecto');
    // Validamos que el folio sea correcto
    const correctFolio = yield usuario.validateFolio(req.body.folio);
    // Sino existe retornamos un mensaje de error
    if (!correctFolio)
        return res.status(400).json('Folio Invalido');
    // Creamos un token para el inicio de sesión con tiempo de expiración de un día
    const token = jsonwebtoken_1.default.sign({ _id: usuario._id }, process.env.TOKEN_SECRET || 'tokenTest', {
        expiresIn: 60 * 60 * 24
    });
    // Devolvemos la información del usuario    
    res.header('auth-token', token).json(usuario);
});
exports.profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = yield Usuario_1.default.findById(req.usuarioId, { folio: 0 });
    if (!usuario)
        return res.status(400).json('Usuario no encontrado');
    res.json(usuario);
});
//# sourceMappingURL=auth.controller.js.map
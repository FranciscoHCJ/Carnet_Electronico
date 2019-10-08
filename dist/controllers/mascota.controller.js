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
const Mascota_1 = __importDefault(require("../models/Mascota"));
// ===================================
// Obtener todas las Mascotas
// ===================================
exports.todos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield Mascota_1.default.find({})
        .populate('usuario', 'nombre apellido email')
        .exec((err, mascotas) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando mascotas',
                errors: err
            });
        }
        res.status(200).json({
            ok: true,
            mascotas: mascotas
        });
    });
});
// ===================================
// Crear nueva Mascota
// ===================================
exports.registro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Creando una mascota
    const mascotas = new Mascota_1.default({
        especie: req.body.especie,
        nombre: req.body.nombre,
        fechaNacimiento: req.body.fechaNacimiento,
        raza: req.body.raza,
        peso: req.body.peso,
        sexo: req.body.sexo,
        color: req.body.color,
        usuario: req.usuarioId
    });
    // Guardamos el nuevo usuario
    const mascota = yield mascotas.save((err, mascotaGuardado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al crear mascota',
                errors: err
            });
        }
        // Respuesta que devolvemos al Cliente que realizo la petición
        res.status(201).json({
            ok: true,
            mascota: mascotaGuardado
        });
    });
});
// ===================================
// Actualizar una Mascota
// ===================================
exports.update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var id = req.params.id;
    var body = req.body;
    yield Mascota_1.default.findById(id, (err, mascota) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar mascota'
            });
        }
        if (!mascota) {
            return res.status(400).json({
                ok: false,
                mensaje: 'La mascota con el id' + id + ' no existe',
                errors: { message: 'No existe un mascota con ese ID' }
            });
        }
        mascota.nombre = body.nombre;
        mascota.fechaNacimiento = body.fechaNacimiento;
        mascota.raza = body.raza;
        mascota.peso = body.peso;
        mascota.sexo = body.sexo;
        mascota.color = body.color;
        mascota.senaParticular = body.senaParticular;
        mascota.usuario = req.usuarioId;
        mascota.save((err, mascotaGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Erro al actualizar mascota',
                    errors: err
                });
            }
            res.status(200).json({
                ok: true,
                mascota: mascotaGuardado
            });
        });
    });
});
// ===================================
// Borrar una Mascota por id
// ===================================
exports.eliminar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var id = req.params.id;
    yield Mascota_1.default.findByIdAndDelete(id, (err, mascotaBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar mascota',
                errors: err
            });
        }
        if (!mascotaBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe una mascota con ese ID',
                errors: { message: 'No existe una mascota con ese ID' }
            });
        }
        res.status(200).json({
            ok: true,
            mascota: mascotaBorrado
        });
    });
});
//# sourceMappingURL=mascota.controller.js.map
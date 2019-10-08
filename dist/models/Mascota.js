"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MascotaSchema = new mongoose_1.Schema({
    especie: { type: String, required: true },
    nombre: { type: String, required: true },
    fechaNacimiento: { type: String, required: true },
    raza: { type: String, required: true },
    peso: { type: String },
    sexo: { type: String, required: true },
    foto: { type: String },
    color: { type: String },
    senaParticular: { type: String },
    usuario: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Usuario', required: [true, 'Debe de existir una referencia a un usuario'] }
});
exports.default = mongoose_1.model('Mascota', MascotaSchema);
//# sourceMappingURL=Mascota.js.map
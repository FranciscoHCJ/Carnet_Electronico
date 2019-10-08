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
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const UsuarioSchema = new mongoose_1.Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    apellido: { type: String, required: [true, 'El apellido es necesario'] },
    email: { type: String, unique: true, required: [true, 'El email es necesario'], lowercase: true },
    folio: { type: String, unique: true, required: [true, 'El folio es necesario'] },
    direccion: { type: String },
    telefono: { type: String },
});
// Método para cifrar el folio
UsuarioSchema.methods.encryptFolio = (folio) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcryptjs_1.default.genSalt(10);
    return bcryptjs_1.default.hash(folio, salt);
});
// Método para comparar el folio recibido con la que esta en la bd
UsuarioSchema.methods.validateFolio = function (folio) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcryptjs_1.default.compare(folio, this.folio);
    });
};
exports.default = mongoose_1.model('Usuario', UsuarioSchema);
//# sourceMappingURL=Usuario.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect('mongodb+srv://FranciscoHC:Carolinayjuan123*45@cluster0-pbius.mongodb.net/carnetDB?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
    .then(db => console.log('Base de Datos: online'))
    .catch(err => console.log(err));
//# sourceMappingURL=database.js.map
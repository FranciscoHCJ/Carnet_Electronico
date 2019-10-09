"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
// Importa ruas
const auth_1 = __importDefault(require("./routes/auth"));
const mascota_1 = __importDefault(require("./routes/mascota"));
// Inicializar Variables
const app = express_1.default();
// Body parser
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
//settings
app.set('port', process.env.PORT || 3000);
// middlewares
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
// routes
app.use('/mascota/', mascota_1.default);
app.use('/auth/', auth_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map
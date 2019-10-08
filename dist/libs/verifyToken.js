"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Middleware
exports.ValidarToken = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token)
        return res.status(400).json('Access denied');
    const payload = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET || 'tokenTest');
    req.usuarioId = payload._id;
    next();
};
//# sourceMappingURL=verifyToken.js.map
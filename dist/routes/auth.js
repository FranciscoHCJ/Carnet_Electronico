"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const verifyToken_1 = require("../libs/verifyToken");
const router = express_1.Router();
router.post('/login', auth_controller_1.login);
router.post('/registro', auth_controller_1.registro);
router.put('/actualizar/:id', verifyToken_1.ValidarToken, auth_controller_1.update);
router.delete('/borrar/:id', verifyToken_1.ValidarToken, auth_controller_1.eliminar);
router.get('/', auth_controller_1.todos);
exports.default = router;
//# sourceMappingURL=auth.js.map
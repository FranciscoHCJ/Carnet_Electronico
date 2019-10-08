"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mascota_controller_1 = require("../controllers/mascota.controller");
const verifyToken_1 = require("../libs/verifyToken");
const router = express_1.Router();
router.post('/registrar', verifyToken_1.ValidarToken, mascota_controller_1.registro);
router.put('/actualizar/:id', verifyToken_1.ValidarToken, mascota_controller_1.update);
router.delete('/borrar/:id', verifyToken_1.ValidarToken, mascota_controller_1.eliminar);
router.get('/mascotas', mascota_controller_1.todos);
exports.default = router;
//# sourceMappingURL=mascota.js.map
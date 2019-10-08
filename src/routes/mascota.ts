import {Router} from 'express';
import {registro, todos, update, eliminar} from '../controllers/mascota.controller';
import { ValidarToken } from '../libs/verifyToken';

const router: Router = Router();

router.post('/registrar', ValidarToken, registro);
router.put('/actualizar/:id', ValidarToken, update);
router.delete('/borrar/:id', ValidarToken, eliminar);
router.get('/mascotas', todos);

export default router;
import {Router} from 'express';
import { registro, login, update, todos, eliminar } from '../controllers/auth.controller';
import { ValidarToken } from '../libs/verifyToken';

const router: Router = Router();

router.post('/login', login);
router.post('/registro', registro);
router.put('/actualizar/:id', ValidarToken, update);
router.delete('/borrar/:id', ValidarToken, eliminar);
router.get('/', todos);


export default router;
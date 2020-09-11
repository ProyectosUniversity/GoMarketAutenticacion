import {Router} from 'express';
const router= Router();

import {registro,login}  from '../controllers/cliente.controller'

router.post('/registro',registro);
router.post('/login',login);

export default router;

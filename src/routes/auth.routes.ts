import {Router} from 'express';
const router= Router();

import {registro,login}  from '../controllers/cliente.controller'

router.post('/api/registro',registro);
router.post('/api/login',login);

export default router;

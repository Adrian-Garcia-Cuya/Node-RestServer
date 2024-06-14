import { Router } from 'express';
import { check } from 'express-validator';

import { validateFields } from '../middlewares/validate-fields.js';
import { login } from '../controllers/auth.js';

const router = Router();

router.post('/login', [
    check('email', 'Debe ser un correo').isEmail(),
    check('password', 'La contrasena es obligatoria').not().isEmpty(),
    validateFields
], login);


export { router };
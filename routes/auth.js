import { Router } from 'express';
import { check } from 'express-validator';

import { validateFields } from '../middlewares/validate-fields.js';
import { googleSignIn, login } from '../controllers/auth.js';

const router = Router();

router.post('/login', [
    check('email', 'Debe ser un correo').isEmail(),
    check('password', 'La contrasena es obligatoria').not().isEmpty(),
    validateFields
], login);

router.post('/google', [
    check('id_token', 'id_token es necesario').not().isEmpty(),
    validateFields
], googleSignIn);


export { router };
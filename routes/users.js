import { Router } from 'express';
import { check, query } from 'express-validator';

import {
    usersGet,
    usersPut,
    usersPost,
    usersDelete } from '../controllers/users.js';
import { isValidRole, checkEmail, userExistsById } from '../helpers/db-validators.js';

import {
    validateFields,
    validateJWT,
    hasRole,
    isAdminRole
 } from '../middlewares/index.js';

const router = Router();

router.get('/',[
    query('from', 'El valor ingresado debe ser un numero').isNumeric().optional(),
    query('limit', 'El valor ingresado debe ser un numero').isNumeric().optional(),
    validateFields,
], usersGet);

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( userExistsById ),
    check('role').custom( isValidRole ),
    validateFields
], usersPut);

router.post('/', [
    //check -> valida los campos indicados y almacena el resultado en la 'request' (req)
    check('name', 'El nombre es obligatorio.').not().isEmpty(),
    check('password', 'La constrasena debe ser de mas de 6 letras.').isLength(6),
    check('email', 'El correo no es valido.').isEmail(),
    check('email').custom( checkEmail ),
    check('role').custom( isValidRole ),
    validateFields
], usersPost);

router.delete('/:id', [
    validateJWT,
    // isAdminRole,
    hasRole('ADMIN_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( userExistsById ),
    validateFields
], usersDelete);

export { router };
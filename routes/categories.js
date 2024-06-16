import { Router } from 'express';
import { check, query } from 'express-validator';

import {
    hasRole,
    validateFields,
    validateJWT
 } from '../middlewares/index.js';

 import { 
     destroy,
    index,
    show,
    store,
    update
} from '../controllers/categories.js';

import { checkCategoryByIdAndState } from '../helpers/db-validators.js';

const router = Router();

router.get('/', [
    query('from', 'El valor ingresado debe ser un numero').isNumeric().optional(),
    query('limit', 'El valor ingresado debe ser un numero').isNumeric().optional(),
    validateFields
], index);


router.get('/:id', [
    check('id', 'El id proporcionado no es valido').isMongoId(),
    check('id').custom( checkCategoryByIdAndState ),
    validateFields
], show);

router.post('/', [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validateFields
], store);

router.put('/:id', [
    validateJWT,
    check('id', 'El id proporcionado no es valido').isMongoId(),
    check('id').custom( checkCategoryByIdAndState ),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validateFields
], update);

router.delete('/:id', [
    validateJWT,
    hasRole('ADMIN_ROLE'),
    check('id', 'El id proporcionado no es valido').isMongoId(),
    check('id').custom( checkCategoryByIdAndState ),
    validateFields
], destroy);


export { router };
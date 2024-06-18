import { Router } from 'express';
import { check } from 'express-validator';

import {
    validateFields,
    validateFileSending
} from '../middlewares/index.js';
import { updateFile, uploadFile } from '../controllers/uploads.js';
import { allowedCollections } from '../helpers/index.js';


const router = Router();

router.post('/', validateFileSending, uploadFile);

router.put('/:collection/:id', [
    validateFileSending,
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('collection').custom( c => allowedCollections( c, ['users', 'products']) ),
    validateFields
], updateFile)


export { router };
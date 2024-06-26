import { Router } from 'express';
import { check } from 'express-validator';

import {
    validateFields,
    validateFileSending
} from '../middlewares/index.js';
import { showImage, updateFileCloudinary, uploadFile } from '../controllers/uploads.js';
import { allowedCollections } from '../helpers/index.js';


const router = Router();

router.get('/:collection/:id', [
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('collection').custom( c => allowedCollections( c, ['users', 'products']) ),
    validateFields
], showImage);

router.post('/', validateFileSending, uploadFile);

router.put('/:collection/:id', [
    validateFileSending,
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('collection').custom( c => allowedCollections( c, ['users', 'products']) ),
    validateFields
], updateFileCloudinary)


export { router };
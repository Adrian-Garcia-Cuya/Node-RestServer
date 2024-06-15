import { Router } from 'express';
import { check } from 'express-validator';

import {
    validateFields,
    validateJWT
 } from '../middlewares/index.js';
import { storeCategory } from '../controllers/categories.js';


const router = Router();



router.get('/', ( req, res ) => {
    res.json('get');
})

router.get('/:id', ( req, res ) => {
    res.json('get - id');
})

router.post('/', [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validateFields
], storeCategory)

router.put('/:id', ( req, res ) => {
    res.json('put');
})

router.delete('/:id', ( req, res ) => {
    res.json('put - delete');
})


export { router };
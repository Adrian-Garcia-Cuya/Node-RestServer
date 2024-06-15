import { Router } from 'express';
import { check } from 'express-validator';

import { validateFields } from '../middlewares/validate-fields.js';


const router = Router();



router.get('/', ( req, res ) => {
    res.json('get');
})

router.get('/:id', ( req, res ) => {
    res.json('get - id');
})

router.post('/', ( req, res ) => {
    res.json('post');
})

router.put('/:id', ( req, res ) => {
    res.json('put');
})

router.delete('/:id', ( req, res ) => {
    res.json('put - delete');
})


export { router };
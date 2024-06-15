import { response } from "express";

import {
    Category
} from '../models/index.js';

const storeCategory = async( req, res = response ) => {

    const name = req.body.name.toUpperCase();

    const categoryDB = await Category.findOne({ name });
    if( categoryDB ){
        return res.status(400).json({
            msg: `La categoria ya existe`
        });
    }

    const data = {
        name,
        user: req.uid
    }
    
    const category = new Category( data );
    await category.save();

    res.status(201).json(category);
}

export { storeCategory };
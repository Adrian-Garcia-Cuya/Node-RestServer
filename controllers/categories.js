import { response } from "express";

import {
    Category
} from '../models/index.js';

const index = async( req, res = response ) => {

    const { limit = 0, from = 0 } = req.query;

    const query = { state: true };

    const [ total, categories] = await Promise.all([
        Category.countDocuments( query ),
        Category.find( query )
        //populate -> obtiene los datos del modelo referenciado
                .populate('user', 'name')
                .skip(Number(from))
                .limit(Number(limit))
    ]);
    
    res.status(200).json({
        total,
        categories
    });
}

const show = async( req, res = response ) => {

    const { id } = req.params

    const category = await Category.findById( id ).populate('user');

    res.status(200).json( category );
}

const store = async( req, res = response ) => {

    const name = String(req.body.name).toUpperCase();

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

const update = async( req, res = response ) => {
    const { id } = req.params;

    const name = String(req.body.name).toUpperCase();

    const nameExists = await Category.findOne({ name });

    if( nameExists ){
        return res.json({
            msg: 'El nombre de la categoria ya se encuentra registrado.'
        })
    }

    const category = await Category.findByIdAndUpdate( id, { name }, { returnDocument: 'after' } )
    
    res.status(200).json( category );
}

const destroy = async( req, res = response ) => {

    const { id } = req.params;

    const category = await Category.findByIdAndUpdate( id, { state: false }, { returnDocument: 'after' })

    res.status(200).json( category );
}

export { 
    index,
    show,
    store,
    update,
    destroy
 };
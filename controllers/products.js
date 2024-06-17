import { response } from "express";

import {
    Product
} from '../models/index.js';

const index = async( req, res = response ) => {

    const { limit = 5, from = 0 } = req.query;

    const query = { state: true };

    const [ total, products] = await Promise.all([
        Product.countDocuments( query ),
        Product.find( query )
                .populate('category', 'name')
                .skip(Number(from))
                .limit(Number(limit))
    ]);
    
    res.status(200).json({
        total,
        products
    });
}

const show = async( req, res = response ) => {

    const { id } = req.params

    const product = await Product.findById( id )
                                 .populate('category', 'name');

    res.status(200).json( product );
}

const store = async( req, res = response ) => {

    const { state, user, ...data} = req.body;
    data.user = req.uid;

    const productExists = await Product.findOne({ name: req.body.name });

    if( productExists ){
        return res.status(400).json({
            msg: `El producto '${ productExists.name }, ya existe`
        });
    }

    data.name = data.name.toUpperCase();
    data.user = req.uid;
    
    const product = new Product( data );

    await product.save();

    res.status(201).json( product );
}

const update = async( req, res = response ) => {
    
    const { id } = req.params;
    const { state, user, ...data} = req.body;

    if( data.name ){
        data.name = data.name.toUpperCase();
    }

    data.user = req.uid;

    const product = await Product.findByIdAndUpdate( id, data, { returnDocument: 'after' } )
                                 .where('state').equals(true);

    if( !product ){
        return res.json({
            msg: `El producto esta inactivo`
        });
    }
    
    res.status(200).json( product );
}

const destroy = async( req, res = response ) => {

    const { id } = req.params;

    const product = await Product.findByIdAndUpdate( id, { state: false }, { returnDocument: 'after' })

    res.status(200).json( product );
}

export { 
    index,
    show,
    store,
    update,
    destroy
 };
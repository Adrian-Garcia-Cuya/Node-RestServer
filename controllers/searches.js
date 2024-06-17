import { response } from "express";
import mongoose from 'mongoose';

import {
    User,
    Category,
    Product,
    Role
} from '../models/index.js'

const existingCollections = {
    'users' : User,
    'categories': {
        'model': Category,
        'ref' : 'user'
    },
    'products': {
        'model': Product,
        'ref': 'category'
    },
    'roles': Role
}
const checkMongoID = ( term ) => {
    return mongoose.Types.ObjectId.isValid( term );
}

const searchDocumentById = async( collection, term, res = response ) => {

    let document;
    const selectedCollection = existingCollections[collection];

    if( selectedCollection.hasOwnProperty('ref') ){
        document = await selectedCollection.model.findById( term )
                                                 .populate( selectedCollection.ref, 'name' );
    }else{
        document = await selectedCollection.findById( term );
    }

    res.json( {
        results: ( document ) ? [ document ] : []
    } );
}

const searchUsers = async( term = '', res = response ) => {

    //Permite que la busqueda sea mas flexible. Es como un 'like' en SQL
    const regex = new RegExp( term, 'i' );

    const users = await User.find({
        //El simbolo '$' permite utilizar los operadores logicos
        $or: [{ name: regex }, { email: regex }],
        $and: [{ state: true }]
    });

    res.json( {
        results: users
    } );
}

const searchCategories = async( term = '', res = response ) => {

    const regex = new RegExp( term, 'i' );

    const category = await Category.find({ name: regex , state: true })
                                   .populate('user', 'name');

    res.json({
        results: category
    })
}

const searchProducts = async( term = '', res = response ) => {

    const regex = new RegExp( term, 'i');

    const product = await Product.find({ name: regex , state: true })
                                 .populate('category', 'name');

    res.json({
        results: product
    })
}

const search = async( req, res = response) => {

    const { collection, term } = req.params;

    if( !existingCollections.hasOwnProperty( collection ) ){
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${ Object.keys(existingCollections).join(', ') }.`
        })
    }

    if( checkMongoID( term ) ){
        return searchDocumentById( collection, term, res );
    }
    
    switch ( collection ){
        case 'users':
            searchUsers( term, res );
            break;
        case 'categories':
            searchCategories( term, res );
            break;
        case 'products':
            searchProducts( term, res )
            break;
        default:
            res.status(500).json({
                msg: 'Olvide realizar esta busqueda.'
            })
    }
}


export { search };
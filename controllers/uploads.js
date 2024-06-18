import { response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

import { storeFile } from '../helpers/index.js';

import {
    User,
    Product
} from '../models/index.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadFile = async( req, res = response ) => {

    storeFile( req.files, undefined, 'imgs' )
    .then( storeFileName => res.json({ storeFileName }))
    .catch( error => res.json({ error }));
}

const updateFile = async( req, res = response) => {
    
    const { id, collection } = req.params;

    let model;

    switch ( collection ) {
        case 'users':
            model = await User.findById( id );
            if( !model ){
                return res.json({
                    msg: `No existe un usuario con el id ${ id }.`
                })
            }
            break;
        case 'products':
            model = await Product.findById( id );
            if( !model ){
                return res.json({
                    msg: `No existe un producto con el id ${ id }.`
                })
            }
            break;
        default:
            return res.status(500).json({ msg: 'Olvide validar esto' });
    }

    //Limipiar imagenes previas
    if( model.img ){
        const imagePath = path.join( __dirname, '../uploads', collection, model.img);
        
        if( fs.existsSync(imagePath) ){
            //Borrar el archivo
            fs.unlinkSync(imagePath)
        }
    }

    const storeFileName = await storeFile( req.files, undefined, collection );
    model.img = storeFileName;

    await model.save();

    res.json( model );
}

const showImage = async( req, res = response) => {

    const { id, collection } = req.params;

    let model;

    switch ( collection ) {
        case 'users':
            model = await User.findById( id );
            if( !model ){
                return res.json({
                    msg: `No existe un usuario con el id ${ id }.`
                })
            }
            break;
        case 'products':
            model = await Product.findById( id );
            if( !model ){
                return res.json({
                    msg: `No existe un producto con el id ${ id }.`
                })
            }
            break;
        default:
            return res.status(500).json({ msg: 'Olvide validar esto' });
    }

    //Limipiar imagenes previas
    if( model.img ){
        const imagePath = path.join( __dirname, '../uploadss', collection, model.img);
        
        if( fs.existsSync(imagePath) ){
            //Borrar el archivo
            return res.sendFile( imagePath );
        }
    }

    const imagePathNotFound = path.join( __dirname, '../assets/no-image.jpg');
    res.sendFile( imagePathNotFound );
}

export { 
    uploadFile,
    updateFile,
    showImage
};
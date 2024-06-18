import { response } from 'express';
import { storeFile } from '../helpers/index.js';

import {
    User,
    Product
} from '../models/index.js'

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

    const storeFileName = await storeFile( req.files, undefined, collection );
    model.img = storeFileName;

    await model.save();

    res.json( model );
}

export { 
    uploadFile,
    updateFile
};
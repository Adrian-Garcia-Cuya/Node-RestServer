import { response } from 'express';
import { storeFile } from '../helpers/index.js';

const uploadFile = async( req, res = response ) => {

    if ( !req.files || Object.keys( req.files ).length === 0 || !req.files.file ) {
        res.status(400).json('No hay archivos que subir.');
        return;
    }
    
    storeFile( req.files )
    .then( storeFileName => res.json({ storeFileName }))
    .catch( error => res.json({ error }));
}

export { uploadFile };
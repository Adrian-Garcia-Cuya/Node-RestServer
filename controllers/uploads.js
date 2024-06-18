import { response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadFile = (req, res = response) => {

    if ( !req.files || Object.keys(req.files).length === 0 || !req.files.file ) {
        res.status(400).json('No hay archivos que subir.');
        return;
    }

    const { file } = req.files;

    const uploadPath = path.join( __dirname, '../uploads/', file.name );

    file.mv(uploadPath, function ( err ) {
        if ( err ) {
            console.log( err )
            return res.status(500).json({ err });
        }

        res.status(200).json({ 
            msg: 'File uploaded to ' + uploadPath
        });
    });
}

export { uploadFile };
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4} from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storeFile = ( files, validExtensions = ['png', 'jpg', 'jpeg', 'gif'], folder = '' ) => {

    return new Promise( (resolve, reject) => {
        const { file } = files;
        const nameCutOff = file.name.split('.');
        const extension = nameCutOff[ nameCutOff.length - 1 ];

        //Validar la extensionf
        if( !validExtensions.includes( extension )){
            return reject(`La extension ${ extension } no es permitida, ${ validExtensions }`);
        }
        
        const temporaryName = uuidv4() + '.' + extension;
        const uploadPath = path.join( __dirname, '../uploads/', folder, temporaryName );

        file.mv(uploadPath, function ( err ) {
            if ( err ) {
                console.log( err )
                reject( err );
            }

            resolve( temporaryName );
        });
    });
}

export { storeFile };
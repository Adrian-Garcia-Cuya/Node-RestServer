import { Role } from '../models/index.js';
import { User } from '../models/index.js';

const isValidRole = async( role = '' ) => {

    const existRole = await Role.findOne({ role });
    if( !existRole ){
        throw new Error(`El rol ${ role } no esta registrado en la base de datos.`);
    }
}

//Verficar la existencia del correo
const checkEmail = async( email ) => {
    
    const existEmail = await User.findOne({ email });
    if( existEmail ){
        throw new Error(`El correo '${ email }' ya se encuentra registrado`);
    }
}

const userExistById = async( id )  => {

    const userExist = await User.findById( id );
    if( !userExist ){
        throw new Error(`El id '${ id }' no existe en la base de datos`);
    }
}



export { isValidRole, checkEmail, userExistById };
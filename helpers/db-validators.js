import Role from '../models/role.js';
import User from '../models/user.js';

const isValidRole = async(role = '') => {

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



export { isValidRole, checkEmail };
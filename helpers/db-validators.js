import { 
    Category,
    Product,
    Role,
    User
} from '../models/index.js';


const isValidRole = async( role = '' ) => {

    const roleExists = await Role.findOne({ role });
    if( !roleExists ){
        throw new Error(`El rol ${ role } no esta registrado en la base de datos.`);
    }
}

//Verficar la existencia del correo
const checkEmail = async( email ) => {
    
    const emailExists = await User.findOne({ email });
    if( emailExists ){
        throw new Error(`El correo '${ email }' ya se encuentra registrado.`);
    }
}

const userExistsById = async( id )  => {

    const userExists = await User.findById( id );
    if( !userExists ){
        throw new Error(`El id '${ id }' no existe en la base de datos.`);
    }
}

const checkCategoryByIdAndState = async( id ) => {

    const category = await Category.findById( id );
    if( !category ){
        throw new Error(`El id ${ id } no existe en la base de datos.`)
    }else if( !category.state ){
        throw new Error(`El categoria con id: ${ id } esta inactiva. `)
    }
}

const checkProductById = async( id ) => {

    const product = await Product.findById( id );
    if( !product ){
        throw new Error(`El producto con id: '${ id }' no existe en la base de datos.`)
    }
}

const allowedCollections = ( collection = '', collections = [] ) => {

    const collectionIncluded = collections.includes( collection );
    if( !collectionIncluded ){
        throw new Error(`La coleccion ${ collection } no es permitida, ${ collections }`);
    }
    
    return true;
}

export { 
    isValidRole,
    checkEmail,
    userExistsById,
    checkCategoryByIdAndState,
    checkProductById,
    allowedCollections
};
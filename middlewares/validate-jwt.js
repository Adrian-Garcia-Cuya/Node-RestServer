import { request, response } from 'express';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

const validateJWT = async( req, res = response, next ) => {

    const token = req.header('x-token');
    if( !token ){
        return res.status(401).json({
            msg: 'No hay ningun token en la peticion'
        })
    }

    try{
        //Verificar el jwt (manipulacion, expiracion o invalidacion)
        const { uid } = jwt.verify( token, process.env.PRIVATE_KEY );

        const user = await User.findById( uid );

        if ( !user ){
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe',
            });
        }

        if( !user.state ){
            return res.status(401).json({
                msg: 'Token no valido - usuario inactivo',
            });
        }

        req.uid = uid;
        req.user = user;

        next();
    }catch( error ){
        console.log(error);
        res.status(401).json({
            msg: 'token no valido',
        });
    }
    
}

export { validateJWT };
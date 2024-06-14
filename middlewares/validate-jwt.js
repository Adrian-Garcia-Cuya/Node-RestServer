import { request, response } from 'express';
import jwt from 'jsonwebtoken';

const validateJWT = ( req, res = response, next ) => {

    const token = req.header('x-token');
    if( !token ){
        return res.status(401).json({
            msg: 'No hay ningun token enl a peti'
        })
    }

    try{
        //Verificar el jwt (manipulacion, expiracion o invalidacion)
        const { uid } = jwt.verify( token, process.env.PRIVATE_KEY );
        req.uid = uid;
        
        next();
    }catch( error ){
        console.log(error);
        res.status(401).json({
            msg: 'token no valido',
        });
    }
    
}

export { validateJWT };
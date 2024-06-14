import { response } from 'express';
import bcryptjs from 'bcryptjs';

import User from '../models/user.js';
import { generateJWT } from '../helpers/generate-jwt.js';


const login = async(req, res = response) => {

    const { email, password } = req.body;

    try{

        const user = await User.findOne({ email });
        if( !user ){
            return res.status(400).json({
                msg: "Usuario / Password no son correctos",
            });
        }

        //Verificar el estado activo/inactivo
        if( !user.state ){
            return res.status(400).json({
                msg: "Usuario / Password no son correctos - state: false",
            });
        }

        //Verificar la contrasena
        const validPassword = bcryptjs.compareSync( password, user.password );
        if( !validPassword ){
            return res.status(400).json({
                msg: "Usuario / Password no son correctos - password",
            });
        }

        //Generacionde JWT
        const token = await generateJWT( user.id );

        res.json({
            user,
            token
        });

    }catch( error ){
        console.log(error);

        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

export { login };
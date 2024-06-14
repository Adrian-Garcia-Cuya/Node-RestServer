import { response } from 'express';
import bcryptjs from 'bcryptjs';

import User from '../models/user.js';
import { generateJWT } from '../helpers/generate-jwt.js';
import { googlVerify } from '../helpers/google-verify.js';


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

        //Generacion de JWT
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

const googleSignIn = async(req, res = response ) => {

    const { id_token } = req.body;

    try{
        const { name, img, email } = await googlVerify( id_token );

        let user = await User.findOne({ email });

        //En caso de que no exista el usuario se crea
        if( !user ){
            const data = {
                name,
                email,
                password: '',
                img,
                role: 'USER_ROLE',
                google: true
            }

            user = new User( data );
            await user.save();
        }

        //En caso de que el usuario este inactivo
        if( !user.state ){
            return res.status(401).json({
                msg: 'Hable con el administrador - Usuario bloqueado'
            })
        }

        const token = await generateJWT( user.id );

        res.json({
            user,
            token
        });

    }catch( error ){
        res.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar'
        });
    }
}

export { login, googleSignIn };
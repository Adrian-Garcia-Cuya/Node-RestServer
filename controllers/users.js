import { response } from 'express';
import bcryptjs from 'bcryptjs';
import User from '../models/user.js';

const usersGet = (req, res = response) => {

    const { q, nombre = "no name"} = req.query;

    res.json({
        msg: 'get API - controlador',
        q,
        nombre,
    });
}

const usersPost = async(req, res) => {

    const { name, email, password, role } = req.body;
    const user = new User( {name, email, password, email, role} );

    //Encriptacion de la contrasena
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );

    await user.save();

    res.status(201).json({
        user
    });
}

const usersPut = async(req, res) => {

    const { id } = req.params;
    const { _id, password, google, ...rest} = req.body;

    //TODO: Validar contra base de datos
    if( password ){
        //Encriptacion de la contrasena
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync( password, salt );
    }

    const user = await User.findByIdAndUpdate( id, rest, { returnDocument: 'after' } );

    res.status(200).json({
        msg: 'put API - controlador',
        user
    });
}

const usersDelete = (req, res) => {
    res.json({
        msg: 'delete API - controlador',
    });
}

export { usersGet, usersPut, usersPost, usersDelete }
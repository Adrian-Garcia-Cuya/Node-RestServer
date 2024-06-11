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

const usersPut = (req, res) => {

    const { id } = req.params;

    res.status(400).json({
        msg: 'put API - controlador',
        id,
    });
}

const usersPost = async(req, res) => {

    const { name, email, password, role } = req.body;
    const user = new User( {name, email, password, email, role} );

    //Verficar la existencia del correo

    //Encriptacion de la contrasena
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );

    await user.save();

    res.status(201).json({
        msg: 'post API - controlador',
        user
    });
}

const usersDelete = (req, res) => {
    res.json({
        msg: 'delete API - controlador',
    });
}

export { usersGet, usersPut, usersPost, usersDelete }
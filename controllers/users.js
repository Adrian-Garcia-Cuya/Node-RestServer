import { response } from 'express';
import bcryptjs from 'bcryptjs';
import User from '../models/user.js';

const usersGet = async(req, res = response) => {
    
    const { limit = 5, from = 0 } = req.query;
    const query = { state: true }

    const [ total, users ] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    res.json({
        total,
        users
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

    if( password ){
        //Encriptacion de la contrasena
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync( password, salt );
    }

    const user = await User.findByIdAndUpdate( id, rest, { returnDocument: 'after' } );

    res.status(200).json(user);
}

const usersDelete = async( req, res = response ) => {

    const { id } = req.params;

    //Eliminacion fisica en la base de datos
    //const user = await User.findByIdAndDelete( id );

    const user = await User.findByIdAndUpdate( id, { state: false } );

    res.json({
        user
    });
}

export { usersGet, usersPut, usersPost, usersDelete }
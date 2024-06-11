import { response } from 'express';

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

const usersPost = (req, res) => {

    const { name, age } = req.body;

    res.status(201).json({
        msg: 'post API - controlador',
        name,
        age,
    });
}

const usersDelete = (req, res) => {
    res.json({
        msg: 'delete API - controlador',
    });
}

export { usersGet, usersPut, usersPost, usersDelete }
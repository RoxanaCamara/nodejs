const {response, request} = require('express')

const usersGet = (req, res = response) => { 

    res.json({
        msg: 'GET API - usuariosPatch'
    });
}
const usersPost = (req, res = response) => { 
    const { nombre, edad } = req.body;
    res.json({
        msg: 'POST API - usuariosPatch', nombre, edad
    });
}
const usersPut = (req, res = response) => { 
    res.json({
        msg: 'PUT API - usuariosPatch'
    });
}
const usersPatch = (req, res = response) => { 
    res.json({
        msg: 'PATCH API - usuariosPatch'
    });
}
const usersDelete = (req, res = response) => { 
    res.json({
        msg: 'DELETE API - usuariosPatch'
    });
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete,
}
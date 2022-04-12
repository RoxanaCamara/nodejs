const {response, request} = require('express')
const Users = require('../models/User')
const bcrypt = require('bcryptjs');

const usersGet = (req, res = response) => { 

    res.json({
        msg: 'GET API - usuariosPatch'
    });
}
const usersPost =  async (req, res = response) => { 
    const {name, email, password, role} = req.body
    const user = new Users({name, email, password, role})
    const salt = bcrypt.genSaltSync()
    user.password = bcrypt.hashSync( user.password, salt)
    await user.save();
    res.json({
        msg: 'POST API - usuarios', 
        user
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
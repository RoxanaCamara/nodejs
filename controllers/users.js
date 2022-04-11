const {response, request} = require('express')
const Users = require('../models/user')

const usersGet = (req, res = response) => { 

    res.json({
        msg: 'GET API - usuariosPatch'
    });
}
const usersPost =  async (req, res = response) => { 
    const user = new Users( req.body)
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
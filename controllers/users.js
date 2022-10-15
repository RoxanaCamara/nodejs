const {response, request} = require('express')
const Users = require('../models/User')
const bcrypt = require('bcryptjs');

const usersGet = async(req, res = response) => {
    const { limit = 5, from= 0 } = req.query
    const query = {estado: true}
    //para ejecutar las dos funciones a la vez
    const [total, users] = await Promise.all([
        Users.find(query).skip(Number(from)).limit(Number(limit)),
        Users.countDocuments(query)])
    res.json({users, total});     
}
const usersPost =  async (req, res = response) => { 
    const {name, email, password, role} = req.body
    const user = new Users({name, email, password, role})
    const salt = bcrypt.genSaltSync()
    user.password = bcrypt.hashSync( user.password, salt)
    await user.save();
    res.json(user);
}
const usersPut = async(req, res = response) => { 

    const { id } = req.params
    const {_id, password, ...all } = req.body

    if(password){
        const salt = bcrypt.genSaltSync()
        all.password = bcrypt.hashSync( password, salt)    
    }
    await Users.findByIdAndUpdate(id, all)

    res.json(all);
}
const usersPatch = (req, res = response) => { 
    res.json({
        msg: 'PATCH API - usuariosPatch'
    });
}
const usersDelete = async (req, res = response) => { 
    const {id } = req.params
    //Fisicamente lo borramos de mongo
    //const userDelete = await Users.findByIdAndDelete(id)

    //Recomendado, en donde dejamos su propiedad en falso para dejar de contarlo
    const userDelete = await Users.findByIdAndUpdate(id, {state:false})
    res.json(userDelete);
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete,
}
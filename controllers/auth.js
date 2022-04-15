
const {response, request} = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helper/generar-jwt');

const authPost =  async(req, res = response) => { 
    
    try {
        const { email, password} = req.body

        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({ msg: "User or password invalid"})
        }
        /*if(!user.estado){
            return res.status(404).json({ msg: "User or password invalid - For state"})
        }*/
        const validPassword = bcrypt.compareSync(password, user.password)
        if(!validPassword){
            return res.status(404).json({ msg: "Password invalid"})
        }
        const token = generarJWT(user.id)  
        res.json({ token, user});
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Comunicate Suport"})   
    }
}

module.exports = { authPost }
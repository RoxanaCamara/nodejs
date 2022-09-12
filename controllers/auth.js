
const {response, request, json} = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helper/generar-jwt');
const { verifyGoogle } = require('../helper/google-verify');

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


const googleSingIn = async (req, res = response) => {
    const { id_token} = req.body
    try {        
        const { name, email, picture } = await verifyGoogle(id_token)  
        let usuario = await User.findOne({ email })  
        if(!usuario){
            //tengo que crearlo
            const data = {
                name, email, password: ':P', img:picture, google: true
            }
            const user = new User(data)
            console.log("🚀 ~ file: auth.js ~ line 45 ~ googleSingIn ~ user", user)
            await user.save();
        }
        /*if(!usuario.estado){
            //tengo que
            res.status(404).json({
                msg: 'Hable con el admin, usuario bloqueado'
            }) 
        }*/
        const token = generarJWT(usuario.id)
        console.log("🚀 ~ file: auth.js ~ line 55 ~ googleSingIn ~ token", token)
        res.json({
            usuario,
            token
        })

    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: 'El token no se pudo verificar'
        })
    }

}

module.exports = { authPost, googleSingIn }
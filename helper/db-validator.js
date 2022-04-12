const Role = require("../models/Role");
const User = require("../models/User");

const isRoleValid = async(role='') => {    
    const existRol = await Role.findOne({role});
    if(!existRol){
        throw new Error(`El rol ${role} no esta registrado en la db`)
    }
}

const isEmailInUsed = async(email='') => {
    const existEmail = await User.findOne({email})
    if(existEmail){
        throw new Error(`El email ${email} ya esta registrado en la db`)
    }
}

const existUserForId = async(id='') => {
    const existId = await User.findById(id)
    if(!existId){
        throw new Error(`El id ${id} no es valido en la db`)
    }
}


module.exports = {
    isRoleValid, isEmailInUsed, existUserForId
}
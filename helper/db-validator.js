const Role = require("../models/Role");
const User = require("../models/User");

const isRoleValid = async(role='') => {    
    const existRol = await Role.findOne({role});
    if(!existRol){
        throw new Error(`El rol ${role} no esta registrado en la db`)
    }
}
const isEmailInUsed = async(email='') => {
    const existEmail = User.findOne({email})
    if(!existEmail){
        throw new Error(`El email ${existEmail} ya esta registrado en la db`)
    }
}

module.exports = {
    isRoleValid, isEmailInUsed
}
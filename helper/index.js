const  dbValidador  = require('../helper/db-validator');
const  validarJWT  = require('../helper/generar-jwt');
const  google = require('../helper/google-verify');
const  guardarArchivos  = require('../helper/guardarArchivos');
const  inquirier  = require('../helper/inquirier');

module.exports = {
    ...dbValidador, 
    ...validarJWT, 
    ...google,
    ...guardarArchivos,
    ...inquirier
}
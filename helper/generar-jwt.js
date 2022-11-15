const jwt = require('jsonwebtoken');
const User = require("../models/User");


const generarJWT = ( uid = '' ) => {

    return new Promise( (resolve, reject) => {

        const payload = { uid };

        jwt.sign( payload, process.env.SECRETKEY, {
            expiresIn: '4h'
        }, ( err, token ) => {

            if ( err ) {
                console.log(err);
                reject( 'No se pudo generar el token' )
            } else {
                resolve( token );
            }
        })

    })
}


const comprobarJWT = async( token = '' ) => {
    try {
        if(token < 10 ){
            return null
        }
        const { uid } = jwt.verify(token, process.env.SECRETKEY)
        const usuario = await User.findById(uid)

        if(usuario){
            return usuario
        }
        else{
            return null
        }
    } catch (error) {
        return null
    }

}

module.exports = {
    generarJWT, comprobarJWT
}

const { ROLES } = require("../constantes/Constantes");


const esAdminRole = async( req = request, res = response, next ) => {

    if( !req.user){
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token primero'
        });
    }
    const { role, name } = req.user
    if(role!= ROLES.ADMIN ){
        return res.status(401).json({
            msg: `${ name } no es administrador - No puede hacer esto`
        })
    }
    next()
}


const tieneRole = (...roles) => {
    return ( req = request, res = response, next ) => {
        const { role, name } = req.user

        if(!roles.includes( role )){
            return res.status(401).json({
                msg: `${ name } no tiene permisos suficientes. Debe tener un rol del tipo ${ roles}.`
            })
        }
        next()
    }
}

module.exports={
    esAdminRole, tieneRole
}
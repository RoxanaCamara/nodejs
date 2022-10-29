
const { Router } = require('express');
const { check } = require('express-validator');
const { loadFiles, updateImage } = require('../controllers/uploads');
const { collectionPermitidas } = require('../helper/db-validator');
const { validadorLoadArchivo } = require('../helper/subir-archivo');
const  { validarCampos, validarJWT, tieneRole, esAdminRole }  = require('../middlewares');

const router = Router();

router.post('/', [
    validadorLoadArchivo,
    validarCampos
], loadFiles );


router.put('/:collection/:id', [ 
    validadorLoadArchivo,
    check('id', 'El id debe ser valido de mongo' ).isMongoId(),
    check('collection').custom( c => collectionPermitidas(c, [ 'users', 'products'])),
    validarCampos
], updateImage );


module.exports = router;
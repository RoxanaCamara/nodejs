
const { Router } = require('express');
const { check } = require('express-validator');
const { loadFiles, updateImage, showImage, updateImageCloudinary } = require('../controllers/uploads');
const { collectionPermitidas } = require('../helper/db-validator');
const { validadorLoadArchivo } = require('../helper/subir-archivo');
const  { validarCampos }  = require('../middlewares');

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
], updateImageCloudinary );

router.get('/:collection/:id', [ 
    check('id', 'El id debe ser valido de mongo' ).isMongoId(),
    check('collection').custom( c => collectionPermitidas(c, [ 'users', 'products'])),
    validarCampos
], showImage );


module.exports = router;
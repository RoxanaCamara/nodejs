
const { Router } = require('express');
const { check } = require('express-validator');
const {  productPost } = require('../controllers/Products');
const { existCategorieForId } = require('../helper/db-validator');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const router = Router();

//obtener las productos - publico
//router.get('/', productsGet )

/* obtener el detalle de una producto - publico
router.get('/:id',[
    check('id').custom( existProductForId ),
    validarCampos
], productGet)*/

//crear una producto - privado
router.post('/', [ 
    validarJWT,
    check('name', 'El nombre de la producto es necesario').notEmpty(),
    check('categorie').custom( existCategorieForId ),
    validarCampos
 ] , productPost)

/* editar una producto - privado
router.put('/:id',[
    validarJWT,
    check('id').custom( existProductForId ),
    validarCampos
], productPut)*/

/*eliminar producto, privado y verificar role
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id').custom( existProductForId ),
    validarCampos
], productDelete)*/

module.exports = router;
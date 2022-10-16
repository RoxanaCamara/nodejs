
const { Router } = require('express');
const { check } = require('express-validator');
const { postCategorie, getCategories, getCategorie, putCategorie, deleteCategorie } = require('../controllers/categories');
const { existNameCategorie } = require('../helper/db-validator');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const router = Router();

//obtener las categorias - publico
router.get('/', getCategories )

// obtener el detalle de una categoria - publico
router.get('/:name',[
    check('name').custom( existNameCategorie ),
    validarCampos
], getCategorie)

//crear una categoria - privado
router.post('/', [ 
    validarJWT,
    check('name', 'El nombre de la categoria es necesario').notEmpty(),
    validarCampos
 ] , postCategorie)

// editar una categoria - privado
router.put('/:name',[
    validarJWT,
    check('name').custom( existNameCategorie ),
    validarCampos
], putCategorie)

//eliminar categoria, privado y verificar role
router.delete('/:name',[
    validarJWT,
    esAdminRole,
    check('name').custom( existNameCategorie ),
    validarCampos
], deleteCategorie)

module.exports = router;
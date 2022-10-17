
const { Router } = require('express');
const { check } = require('express-validator');
const { postCategorie, getCategories, getCategorie, putCategorie, deleteCategorie } = require('../controllers/categories');
const { existNameCategorie, existCategorieForId } = require('../helper/db-validator');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const router = Router();

//obtener las categorias - publico
router.get('/', getCategories )

// obtener el detalle de una categoria - publico
router.get('/:id',[
    check('id').custom( existCategorieForId ),
    validarCampos
], getCategorie)

//crear una categoria - privado
router.post('/', [ 
    validarJWT,
    check('name', 'El nombre de la categoria es necesario').notEmpty(),
    check('name').custom( existNameCategorie ),
    validarCampos
 ] , postCategorie)

// editar una categoria - privado
router.put('/:id',[
    validarJWT,
    check('id').custom( existCategorieForId ),
    check('name', 'El nombre de la categoria es necesario').notEmpty(),
    check('name').custom( existNameCategorie ),
    validarCampos
], putCategorie)

//eliminar categoria, privado y verificar role
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id').custom( existCategorieForId ),
    validarCampos
], deleteCategorie)

module.exports = router;
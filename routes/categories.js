
const { Router } = require('express');
const { check } = require('express-validator');
const { postCategorie } = require('../controllers/categories');
const { validarJWT, validarCampos } = require('../middlewares');

const router = Router();

//obtener las categorias - publico
router.get('/', (req, res) => {
    res.json('con exito')
} )

// obtener el detalle de una categoria - publico
router.get('/:id', (req, res) => {
    res.json('con exito')
})

//crear una categoria - privado
router.post('/', [ 
    validarJWT,
    check('name', 'El nombre de la categoria es necesario').notEmpty(),
    validarCampos
 ] , postCategorie)

// editar una categoria - privado
router.put('/:id', (req, res) => {
    res.json('con exito')
})

router.delete('/:id', (req, res) => {
    res.json('con exito')
})

module.exports = router;
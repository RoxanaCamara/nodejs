
const { Router } = require('express');
const { check } = require('express-validator');
const { usersGet,
        usersPut,
        usersPost,
        usersDelete,
        usersPatch } = require('../controllers/users');
const { isRoleValid, isEmailInUsed, existUserForId } = require('../helper/db-validator');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();
router.get('/', usersGet );

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existUserForId ),
    check('role').custom( isRoleValid ),
    validarCampos
], usersPut );

router.post('/', [
    check('email', 'Email not is valid').isEmail(),
    check('email').custom( isEmailInUsed),
    check('name', 'Name not is valid').notEmpty(),
    check('password', 'Password not is valid').isLength({min: 6}),
    check('role').custom( isRoleValid ),
    validarCampos
], usersPost );

router.delete('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existUserForId ),
    validarCampos
],  usersDelete );

router.patch('/', usersPatch );

module.exports = router;
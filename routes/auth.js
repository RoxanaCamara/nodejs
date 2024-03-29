
const { Router } = require('express');
const { check } = require('express-validator');
const { authPost, googleSingIn, renovarToken } = require('../controllers/auth');
const { isEmailNotUsed } = require('../helper/db-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/login', [
    check('email', 'Email not is valid').isEmail(),
    check('email').custom( isEmailNotUsed),
    check('password', 'Password not is valid').isLength({min: 6}),
    validarCampos
], authPost );

router.post('/google', [
    check('id_token', 'El id_token es necesario').notEmpty(),
    validarCampos
], googleSingIn );


router.get('/', validarJWT, renovarToken);
module.exports = router;
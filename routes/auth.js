
const { Router } = require('express');
const { check } = require('express-validator');
const { authPost } = require('../controllers/auth');
const { isEmailNotUsed } = require('../helper/db-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/login', [
    check('email', 'Email not is valid').isEmail(),
    check('email').custom( isEmailNotUsed),
    check('password', 'Password not is valid').isLength({min: 6}),
    validarCampos
], authPost );

module.exports = router;
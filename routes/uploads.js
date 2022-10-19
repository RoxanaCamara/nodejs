
const { Router } = require('express');
const { check } = require('express-validator');
const  { validarCampos, validarJWT, tieneRole, esAdminRole }  = require('../middlewares');




const router = Router();
router.get('/', (req, res = response) => { res.json("Hola")} );


module.exports = router;
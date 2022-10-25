
const { Router } = require('express');
const { check } = require('express-validator');
const { loadFiles } = require('../controllers/uploads');
const  { validarCampos, validarJWT, tieneRole, esAdminRole }  = require('../middlewares');

const router = Router();

router.post('/', loadFiles );


module.exports = router;
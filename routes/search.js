
const { Router } = require('express');
const { getSearch } = require('../controllers/search');

const router = Router();
router.get('/:collection/:termino', getSearch )

module.exports = router;

const { Router } = require('express');
const { usersGet } = require('../controllers/users');

const router = Router();

router.get('/', (req, res) => {
    res.json('con exito')
} )

router.get('/:id', (req, res) => {
    res.json('con exito')
})

router.post('/', (req, res) => {
    res.json('con exito')
})

router.put('/:id', (req, res) => {
    res.json('con exito')
})

router.delete('/:id', (req, res) => {
    res.json('con exito')
})

module.exports = router;
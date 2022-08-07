const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json('Home');
})

router.get('/users', (req, res) => {
    res.json('Gel all users');
})

router.get('/user/:id', (req, res) => {
    res.json('Get user ' + req.params.id);
})

module.exports = router;
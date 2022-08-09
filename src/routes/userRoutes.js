const express = require('express');
const router = express.Router();
const userAPIs = require("../controllers/userController");

router.post('/login', userAPIs.login);

router.get('/users', userAPIs.getAll);

router.get('/user/:id', userAPIs.get);

module.exports = router;
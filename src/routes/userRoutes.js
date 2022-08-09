const express = require('express');
const router = express.Router();
const userAPIs = require("../controllers/userController");
const auth = require("../middleware/auth");

router.post('/login', userAPIs.login);

router.get('/users', auth, userAPIs.getAll);

router.get('/user/:id', userAPIs.get);

module.exports = router;
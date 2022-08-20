const express = require('express');
const router = express.Router();
const userAPIs = require("../controllers/userController");
const auth = require("../middleware/auth");
const constant = require("../utils/constants");

router.post('/login', userAPIs.login);

router.get('/users', auth(constant.ROLE_ADMIN), userAPIs.getAll);

router.get('/user/:email', auth([constant.ROLE_ADMIN, constant.ROLE_USER]), userAPIs.get);

router.post('/user', auth(constant.ROLE_ADMIN), userAPIs.create);

router.put('/user', auth(constant.ROLE_ADMIN), userAPIs.update);

router.delete('/user/:email', auth(constant.ROLE_ADMIN), userAPIs.delete);

module.exports = router;
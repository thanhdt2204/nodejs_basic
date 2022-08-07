const chalk = require('chalk');
const express = require('express');
const router = require('./router.js');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use('/api', router);

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
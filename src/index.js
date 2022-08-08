const chalk = require('chalk');
const express = require('express');
const router = require('./routes/userRoutes');
const connection = require('./database');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected");
});

app.use('/api', router);

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
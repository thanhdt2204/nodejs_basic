const chalk = require('chalk');
const express = require('express');
const router = require('./router.js');
const connection = require('./database');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

connection.connect(function (err) {
    if (err) throw err;
    var sql = "SELECT * FROM user";
    connection.query(sql, function (err, results) {
        if (err) throw err;
        console.log(results);
    })
});

app.use('/api', router);

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
const chalk = require('chalk');
const express = require('express');
const router = require('./routes/userRoutes');
const sequelize = require('./database');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
    res.json('Home');
});

app.use('/api', router);

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
const express = require('express');
const router = require('./routes/userRoutes');
require('dotenv').config();
const bodyParser = require('body-parser');
const handleException = require('./middleware/exception-handler');

const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
    res.json('Home');
});

app.use(bodyParser.json());

app.use('/api', router);

app.use(handleException);

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
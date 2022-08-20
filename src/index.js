const express = require('express');
const router = require('./routes/userRoutes');
require('dotenv').config();
const bodyParser = require('body-parser');
const handleException = require('./middleware/exception-handler');
const cors = require('cors');
const swaggerUI = require("swagger-ui-express");

const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
    res.json('Home');
});

app.use(bodyParser.json());

var corsOptions = {
    origin: '*',
    methods: '*',
    allowedHeaders: '*',
    exposedHeaders: 'Authorization,Link,X-Total-Count',
    credentials: false,
    maxAge: 3600
}
app.use(cors(corsOptions));

const swaggerDocument = require('./config/swagger.json');
app.use("/swagger-ui.html", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/api', router);

app.use(handleException);

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
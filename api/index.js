const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('config');
const NotFound = require('./errors/NotFound');
const InvalidField = require('./errors/InvalidField');
const MissingData = require('./errors/MissingData');
const NotAllowedValue = require('./errors/NotAllowedValue');
const acceptedFormats = require('./Serializer').acceptedFormats

app.use(bodyParser.json());

app.use((req, res, next) => {
    let requiredFormat = req.header('Accept');

    if(requiredFormat === '*/*') {
        requiredFormat = 'application/json';
    }

    if(acceptedFormats.indexOf(requiredFormat) === -1) {
        res.status(406);
        res.end();
        return;
    }

    res.setHeader('Content-Type', requiredFormat);
    next();
})

const router = require('./routes/fornecedores')
app.use('/api/fornecedores', router);

app.use((error, req, res, next) => {
    let status = 500;

    if (error instanceof NotFound) {
        status = 404;
    } 

    if (error instanceof InvalidField || error instanceof MissingData) {
        status = 400;
    }

    if(error instanceof NotAllowedValue) {
        status = 406;
    }

    res.status(status);
    res.send(
        JSON.stringify({
            message: error.message,
            id: error.idError
        })
    );
})

app.listen(config.get('api.port'), () => console.log('API running'));
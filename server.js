const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

//--------------Routing Functions---------------





//-----------Initialize App----------------------

app.use(express.static('public'));

//add all routes


//Start listening
app.listen(PORT, () => {
    console.log('Server now listening on Port '+PORT);
})
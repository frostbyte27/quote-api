const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

//--------------Paths----------------
const RAND_QUOTE = '/api/quotes/random'
const ALL_QUOTES = '/api/quotes'


//--------------Routing Functions---------------

//GET Random Quote
function randomQuoteHandler(req, res, next){
    //get a random quote
    let quoteObj = {
        quote: getRandomElement(quotes)
    }
    if(quoteObj.quote){
        console.log('Got random quote: '+quoteObj.quote.quote+' - '+ quoteObj.quote.person);
        res.status(200).send(quoteObj);
    }
    else{
        res.sendStatus(404);
    }
}

// function allQuotesHandler(req, res, next){
    
// }

// function randomQuoteHandler(req, res, next){
    
// }

//-----------Initialize App----------------------

app.use(express.static('public'));

//add all routes
app.get(RAND_QUOTE, randomQuoteHandler);

//Start listening
app.listen(PORT, () => {
    console.log('Server now listening on Port '+PORT);
})
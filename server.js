const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

//--------------Paths----------------
const RAND_QUOTE = '/api/quotes/random'
const QUOTES_BASE = '/api/quotes'
// const PERSON_QUOTES = '/api/quotes?person'


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


function byAuthorHandler(req, res, next){
    //check if there is a person specified by query string
    if(req.query.person){
        //filter the quotes array
        let byAuthor = quotes.filter( (quote) =>{
            return quote.person === req.query.person;
        })   

        console.log('Found all quotes by: '+req.query.person);
        res.status(200).send({quotes: byAuthor});
    }
    else{
        next();
    }

}

function allQuotesHandler(req, res, next){
    
    if(quotes){
        // console.log('Got all quotes');
        //create wrapper object
        let quotesWrapper = {}
        quotesWrapper.quotes = quotes;
        res.status(200).send(quotesWrapper);
        return;
    }
    res.send(404);
}

function addQuoteHandler(req, res, next){
    //verify that 'quote' and 'person' properties exist in the query string
    if(req.query.quote && req.query.person){
        console.log('Adding new Quote:\n"'+ req.query.quote+'"\n\t\t'+req.query.person);
        //build a quote object and add it to the array
        quotes.push({ quote:req.query.quote, person: req.query.person});
    }
    else{
        //if not, respond with error code 400
        res.sendStatus(400);
    }
}

//-----------Initialize App----------------------

app.use(express.static('public'));

//add routes to stack
app.get(RAND_QUOTE, randomQuoteHandler);
app.get(QUOTES_BASE, byAuthorHandler);
app.get(QUOTES_BASE, allQuotesHandler);

app.post(QUOTES_BASE, addQuoteHandler);

//Start listening
app.listen(PORT, () => {
    console.log('Server now listening on Port '+PORT);
})
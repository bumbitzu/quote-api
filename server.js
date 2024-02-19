// Import the Express library to create a server
const express = require('express');
// Initialize the Express application
const app = express();

// Import quotes array and utility functions from local modules
const { quotes } = require('./data');
const { getRandomElement, filterByAuthor } = require('./utils');

// Define the port to listen on, defaulting to 4001 if not specified in the environment variables
const PORT = process.env.PORT || 4001;

// Middleware to parse JSON bodies in requests
app.use(express.json());
// Middleware to serve static files from the 'public' directory
app.use(express.static('public'));

// Function to handle requests for a random quote
function getRandomQuote(req, res)
{
  const randomQuote = getRandomElement(quotes);
  res.json({ quote: randomQuote });
}

// Function to handle requests for all quotes, optionally filtered by author
function getAllQuotes(req, res)
{
  const { person } = req.query;
  if (person)
  {
    const response = filterByAuthor(quotes, person);
    res.json({ quotes: response });
  } else
  {
    const AllQuotes = quotes.map((item, index) => ({
      id: index + 1,
      quote: item.quote,
      person: item.person,
    }));
    res.json({ quotes: AllQuotes });
  }
}

// Function to handle requests to post a new quote
function postQuote(req, res)
{
  const quote = req.query.quote;
  const person = req.query.person;
  if (!quote || !person)
  {
    res.status(400).send({ message: "Both quote and person are required in the query parameters." });
  } else
  {
    const newQuote = { quote, person };
    quotes.push(newQuote);
    res.status(201).send({ quote: newQuote });
  }
}

// Function to handle requests to update an existing quote
function updateQuote(req, res)
{
  const { id } = req.params;
  const index = parseInt(id) - 1;
  const { quote, person } = req.body;
  if (index !== -1)
  {
    if (!quote && !person)
    {
      res.status(404).send({ message: "No quote or person, please provide at least one" });
    } else
    {
      const unchangedQuote = quotes[ index ].quote;
      const unchangedPerson = quotes[ index ].person;
      quotes[ index ] = { quote: quote || unchangedQuote, person: person || unchangedPerson };
      res.status(200).send({ quote: quotes[ index ] });
    }
  } else
  {
    res.status(404).send({ message: "Quote not found." });
  }
}

// Function to handle requests to delete a quote
function deleteQuote(req, res)
{
  const { id } = req.params;
  const index = parseInt(id) - 1;
  if (index !== -1)
  {
    quotes.splice(index, 1);
    res.status(200).send();
  } else
  {
    res.status(404).send({ message: "Quote not found." });
  }
}

// Define routes for the server
app.get('/api/quotes/random', getRandomQuote);
app.get('/api/quotes', getAllQuotes);
app.post('/api/quotes', postQuote);
app.put('/api/quotes/:id', updateQuote);
app.delete('/api/quotes/:id', deleteQuote);

// Start listening on the defined PORT, with a console log to confirm it's running
app.listen(PORT, () =>
{
  console.log(`Server running on localhost:${PORT}`);
});

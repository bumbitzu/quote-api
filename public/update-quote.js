const submitButton = document.getElementById('submit-quote');
const newQuoteContainer = document.getElementById('new-quote');

submitButton.addEventListener('click', () =>
{
  const id = document.getElementById('id').value
  const quote = document.getElementById('quote').value;
  const person = document.getElementById('person').value;
  
  fetch(`/api/quotes/${id}`, {
    method: 'PUT',
    headers:
    {
    'Content-Type': 'application/json', // Indicate that the request body is JSON
    },
    body: JSON.stringify({ quote, person })
  })
  .then(response => response.json())
    .then(({ quote }) =>
    {
      console.log(`${quote.quote}, ${quote.person}`)
    const newQuote = document.createElement('div');
    newQuote.innerHTML = `
    <h3>Congrats, your quote was updated!</h3>
    <div class="quote-text">${quote.quote}</div>
    <div class="attribution">- ${quote.person}</div>
    <p>Go to the <a href="index.html">home page</a> to request and view all quotes.</p>
    `
    newQuoteContainer.appendChild(newQuote);
  });
});

const deleteButton = document.getElementById('delete-quote');
const newQuoteContainer = document.getElementById('new-quote');

deleteButton.addEventListener('click', () =>
{
  const id = document.getElementById('id').value
  fetch(`/api/quotes/${id}`, {
    method: 'DELETE',
  })
  .then((response) =>
  {
    console.log(response);
    if (response.ok)
    {
      const newQuote = document.createElement('div');
      newQuote.innerHTML = `
    <h3>Congrats, your quote was deleted!</h3>
    <p>Go to the <a href="index.html">home page</a> to request and view all quotes.</p>
    `
      newQuoteContainer.appendChild(newQuote);
    }
  })
});

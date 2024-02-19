const getRandomElement = arr => {
  if (!Array.isArray(arr)) throw new Error('Expected an array');
  return arr[Math.floor(Math.random() * arr.length)];
}
const filterByAuthor = (quotes,person) =>
{
  return quotes.filter(quote => quote.person.toLowerCase() === person.toLowerCase());
}
module.exports = {
  getRandomElement,
  filterByAuthor
};

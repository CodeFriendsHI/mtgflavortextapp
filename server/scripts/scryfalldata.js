/** Scrafall data fetcher
 * 
 * This is a script to fetch cards from the Scyfall API and store them longterm.
 * 
 * Fetches all cards that have flavor text and stores in database.
 * Reduces number of GET requests made to the Scryfall API. 
 * 
 */


require('dotenv').config();
require('isomorphic-fetch');

const { query } = require('./db');

const delay = 500;

async function get(url) {
  const response = await fetch(url);
  const json = await response.json();
  return json;
}

async function addToDB(data) {

  const queryString = `
    INSERT INTO
      cardstorage
      (cardID, setID, name, flavor, imglink, borderColor)
    VALUES
      ($1, $2, $3, $4, $5, $6)`;

  for (let i = 0; i < data.length; i++) {

    if (data[i].card_faces) {
      continue;
    }

    const values = [
      data[i].id,
      data[i].set,
      data[i].name,
      data[i].flavor_text,
      data[i].image_uris.border_crop,
      data[i].border_color,
    ];
    console.info(`Adding: ${data[i].name}\r`);
    await query(queryString, values);
  }
}

async function fetchData(page) {

  const data_url = `https://api.scryfall.com/cards/search?format=json&include_extras=false&order=name&page=${page}&q=ft:/./&unique=cards`;
  
  console.info(`Fetching Scryfall data - Page: ${page}`);
  console.info(`Path: ${data_url}\n`)
  
  const response = await get(data_url);

  const { data, total_cards, has_more } = response;

  await addToDB(data);

  console.info(`\nDelay between requests: ${delay}ms\n`);

  if (has_more) {
    setTimeout(() => {
      fetchData(page + 1);
    }, delay);
  }
}

const initialPage = 1;
fetchData(initialPage);
console.info('Finished adding cards\n');

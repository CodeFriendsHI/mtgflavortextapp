const baseurl = 'https://api.scryfall.com/cards/';

async function get(endpoint) {

  const url = `${baseurl}${endpoint}`;

  const response = await fetch(url);
  const result = await response.json();

  return { result, status: response.status };
}

async function post(card, set){

  const url = `http://127.0.0.1:3001/`;

  const options = {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({card, set}),
  }

  const response = await fetch(url, options);

}

export default { get, post };

const baseurl = 'https://api.scryfall.com/cards/';

async function get(endpoint) {

  const url = `${baseurl}${endpoint}`;

  const response = await fetch(url);
  const result = await response.json();

  return { result, status: response.status };
}

export default { get };

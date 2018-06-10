require("dotenv").config();
const connectionString = process.env.DATABASE_URL;
const { Client } = require("pg");
const xss = require("xss");

/**
 * Execute an SQL query
 *
 * @param {string} sqlQuery - SQL query to execute
 * @param {array} [values=[]] - Values for parameterized query
 *
 * @returns {Promise} Promise representing the result of the SQL query
 */
async function query(sqlQuery, values = []) {
  const client = new Client({
    connectionString
  });
  await client.connect();

  let result;

  try {
    result = await client.query(sqlQuery, values);
  } catch (err) {
    throw err;
  } finally {
    await client.end();
  }
  return result;
}

/**
 *  add card 
 * 
 *
 * @param {string} id - id of the card
 *
 * @returns {Promise} Promise representing the result of the insertion
 */
async function addCard(id) {

    const sqlQuery = 'INSERT INTO CARDS (cardID) VALUES($1)';

    const result = await query(sqlQuery, [xss(id)]);

    return result;
}

/**
 *  get all cards
 * 
 * @returns {Promise} Promise representing all the cards
 */
async function getCards() {

    const sqlQuery = 'SELECT * FROM CARDS';

    const result = await query(sqlQuery, []);

    return result;
}

module.exports = {
    addCard,
    getCards,
    query,
};

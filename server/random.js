const express = require('express');

const random = express.Router();
const db = require('./db');
const mtgValidate = require('./validateMagic');

function catchErrors(fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
}

async function getCardCount(req, res, next) {
  
  const count = await db.getCount();

  if (count.rows.length === 0) {
    next();
  } else {
    return res.status(200).json(count.rows[0]);
  }
}

async function getRandomCard(req, res, next) {

  const card = await db.getRandom();

  if (card.rows.length === 0) {
    next();
  } else {
    return res.status(200).json(card.rows[0]);
  }

}

random.get('/count', catchErrors(getCardCount));
random.get('/', catchErrors(getRandomCard));

module.exports = random;

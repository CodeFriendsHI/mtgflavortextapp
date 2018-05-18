/* packages */
const express = require('express');

const vote = express.Router();


vote.get('/', (req, res) => {
    res.status(200).json({});
})

vote.post('/', (req, res) => {
    res.status(200).json({});
})
module.exports = vote;
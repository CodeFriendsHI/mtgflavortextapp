/* packages */
const express = require("express");

const vote = express.Router();
const xss = require("xss");
const db = require("./db");
const mtgValidate = require("./validateMagic");

/* validaton and sanitize */

const { body, validationResult } = require("express-validator/check");

const { sanitize } = require("express-validator/filter");

const bodyValidation = [
    body("card")
        .exists()
        .withMessage("No card found!"),
    body("set")
        .exists()
        .withMessage("No set found!"),

    sanitize("card").trim(),
    sanitize("set").trim()
];

function catchErrors(fn) {
    return (req, res, next) => fn(req, res, next).catch(next);
}

async function getAll(req, res, next) {
    const cards = await db.getCards();

    if (cards.rows.length === 0) {
        next();
    } else {
        res.status(200).json(cards);
    }
}

async function addCard(req, res, next) {
    const { card, set } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ error: "error" });
    }

    const validate = await mtgValidate.validate(set, card);

    if (validate) {
        const add = await db.addCard(xss(card), xss(set));

        return res.status(200).json({ status: "success" });
    } else {
        return res.status(401).json({ error: "validation error" });
    }
}

vote.post("/", bodyValidation, catchErrors(addCard));

vote.get("/all", catchErrors(getAll));

module.exports = vote;

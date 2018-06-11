require("dotenv").config();

const express = require("express");

const app = express();
const random = require("./random");
const vote = require("./vote");
app.use(express.json());

app.use("/random", random);
app.use("/", vote);

function notFoundHandler(req, res, next) {
    // eslint-disable-line
    const title = "NotFound";
    const message = "Ups!";
    res.status(404).json({
        title,
        message
    });
}

function errorHandler(err, req, res, next) {
    // eslint-disable-line
    console.error(err);
    const title = "Big ERROR";
    const message = "";
    res.status(500).json({
        title,
        message
    });
}

app.use(notFoundHandler);
app.use(errorHandler);

const hostname = "127.0.0.1";
const port = 3001;

app.listen(port, hostname, () => {
    console.info(`Server running at http://${hostname}:${port}/`);
});

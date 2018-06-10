CREATE TABLE cards (
    cardID int,
    setID VARCHAR(64)
);

CREATE TABLE cardstorage (
    cardID VARCHAR(64),
    setID VARCHAR(64),
    name VARCHAR(150),
    flavor TEXT,
    imglink VARCHAR(99),
    borderColor VARCHAR(64)
);

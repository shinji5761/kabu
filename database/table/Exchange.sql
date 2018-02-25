DROP TABLE IF EXISTS exchange CASCADE;
CREATE TABLE exchange (
      symbol  VARCHAR(6)
    , bid   FLOAT
    , price FLOAT
    , ask   FLOAT
    , time  INTEGER 
);

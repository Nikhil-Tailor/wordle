DROP TABLE IF EXISTS wordle;

CREATE TABLE IF NOT EXISTS wordsTable (
    id   serial PRIMARY KEY,
    words  text
);

INSERT INTO wordsTable (words) VALUES
( 'words' ),
( 'audio' ),
( 'people' );
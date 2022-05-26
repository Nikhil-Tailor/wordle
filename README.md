## How words are compared
When the user presses enter, if the row is full of letters, then a post request is sent to the server.
When sent to the server, it is compared to today's word. For each letter sent to the server a letter is sent back to the client. 'c' is sent if the word letter is in the **c**orrect position. 'p' is sent if the letter is in the wrong **p**osition. 'w' is sent if the letter is **w**rong.
Then in the client the word returned is used to change the boxes to the correct colour.

## Dictionary for check is a word is real
In order to check if a word is an actual English word, a fetch request is sent to the server provided.
Below is the URL.
https://dictionary-dot-sse-2020.nw.r.appspot.com
I used the function below to unsure bad data is not sent to the server
```js
encodeURIComponent(word)```

## How words are stored in db
The list of words in the database is created in the program WordsGenerating.js. This was then added to the wordle.sql file using the command 
```shell
node WordGenerating.js >> wordle.sql
```
I chose a psql database as it allows the database to be run on a server and would be better if I wanted to use a wide variety of word lengths in the future.
The database must be set up using the command 
```shell
npm run setup
```
When the server first starts it words out the number of days since 11th of April. Then is finds the word with the primary key of that number.
While running, when a request is made to see the word, the program checks if it is a new day, if so it gets the new word from the database.

## How stored in program
During program running each letter is stored in the DOM, this was chosen so that the is always only one place that letters are stored while writing into the boxes.
Once the word is verified as correct it is stored in the local storage.

## How stored in local stored
The words, colour of each box, last used date and scores are stored in local storage.
The program calculates if it's a different day since the game was last used.
If not, and if the words already stored, it rewrites the words them into the DOM and gives are box a colour.
Scores are also stored in local storage. The is a JSON element for number of tries possible. The element is incremented when the game is finished in that number of tries

## Viewing scores
Scores can be viewed by pressing the scores button.
It will also be removed when pressing again
Once you finish the game, the scores are also displayed.
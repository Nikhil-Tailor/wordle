'use strict';
import express from 'express';
import * as db from './database.js';
const app = express();
let todaysWord = '';
let serverDate = new Date();

function checkword(wordtocheck) {
  isTodayANewDay();
  // console.log(wordtocheck);
  let colourword = '';
  let temp = '';
  for (let i = 0; i < wordtocheck.length; i++) {
    if (wordtocheck[i] === todaysWord[i]) {
      colourword += 'c';
      temp += wordtocheck[i];
    } else if (todaysWord.includes(wordtocheck[i])) {
      if (countOccurrences(todaysWord, wordtocheck[i]) > countOccurrences(temp, wordtocheck[i])) {
        colourword += 'p';
        temp += wordtocheck[i];
      } else {
        colourword += 'w';
        temp += wordtocheck[i];
      }
    } else {
      colourword += 'w';
    }
    // console.log(temp);
  }
  // console.log(colourword);
  return colourword;
}

function countOccurrences(str, letter) {
  const re = new RegExp(letter, 'g');
  const matching = str.match(re);
  if (matching == null) {
    return 0;
  } else {
    return matching.length;
  }
}
async function getWord(n) {
  const x = await db.selectWord(n);
  return x;
}
async function setWord() {
  const startDate = new Date(Date.UTC(2022, 4, 11, -1, 0, 0));
  // const currentDate = new Date();
  const daysSince = Math.floor((serverDate - startDate) / (1000 * 3600 * 24));
  const wordFromDb = await getWord(daysSince);
  // console.log(daysSince);
  // console.log(wordFromDb);
  todaysWord = wordFromDb.words;
}

function isTodayANewDay() {
  const date = new Date();
  const todaysDate = [date.getMonth(), date.getDate(), date.getFullYear()];
  const lastServerDate = [serverDate.getMonth(), serverDate.getDate(), serverDate.getFullYear()];
  // console.log('DATE= ' + lastDate[2]);
  // [4, 5, 2022]
  // if
  if ((todaysDate.toString() !== lastServerDate.toString())) {
    serverDate = new Date();
    setWord();
  }
}
app.use(express.static('public'));
app.post('/checker', express.json(), (req, res) => {
  // console.log(req.body.msg);
  res.json((checkword(req.body.msg)));
});
app.get('/word', (req, res) => {
  res.json(todaysWord);
});
setWord();
app.listen(8080);

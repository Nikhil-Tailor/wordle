'use strict';
import express from 'express';
import * as db from './database.js';
const app = express();
let todaysWordFive = '';
let todaysWordSix = '';
let serverDate = new Date();

function checkword(wordtocheck) {
  isTodayANewDay();
  let todaysWord = '';
  console.log(wordtocheck);
  if (wordtocheck.length === 5) {
    todaysWord = todaysWordFive;
  } else if (wordtocheck.length === 6) {
    todaysWord = todaysWordSix;
  }
  let colourword = '';
  let temp = '';
  console.log(wordtocheck);
  console.log(todaysWord);
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
async function getWordFive(n) {
  const x = await db.selectWordFive(n);
  return x;
}
async function getWordSix(n) {
  const x = await db.selectWordSix(n);
  return x;
}
async function setWord() {
  const startDate = new Date(Date.UTC(2022, 4, 11, -1, 0, 0));
  // const currentDate = new Date();
  const daysSince = Math.floor((serverDate - startDate) / (1000 * 3600 * 24));
  const wordFromDbFive = await getWordFive(daysSince);
  todaysWordFive = wordFromDbFive.words;
  const wordFromDbSix = await getWordSix(daysSince);
  todaysWordSix = wordFromDbSix.wordssix;
  // console.log('TODAYSWORD' + todaysWordFive);
  // console.log('TODAYSWORD' + todaysWordSix);
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
app.get('/word5', (req, res) => {
  res.json(todaysWordFive);
});
app.get('/word6', (req, res) => {
  res.json(todaysWordSix);
});
setWord();
app.listen(8080);

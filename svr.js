'use strict';
import express from 'express';
import * as db from './database.js';

let todaysWord='';
const app = express();
app.use(express.static('public'));

app.post('/checker', express.json(), (req, res) => {
  // res.json(JSON.stringify(checkword(req)));
  console.log(req.body.msg);
  // res.json(JSON.stringify(checkword(req.body.msg)));

  res.json((checkword(req.body.msg)));
});
app.get('/word', (req, res) => {
  res.json(todaysWord);
});

function checkword(wordtocheck) {
  console.log(wordtocheck);
  let colourword = '';
  console.log('WORDTOCHECK' + wordtocheck);
  let temp = '';
  for (let i = 0; i < wordtocheck.length; i++) {
    console.log('inforloop');
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


      // colourword += 'p';
      // console.log(countOccurrences(todaysWord, wordtocheck[i]));
      // console.log(countOccurrences(temp, wordtocheck[i]));
    } else {
      colourword += 'w';
    }
    console.log(temp);
  }
  console.log(colourword);
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


// async function getWord(req, res) {
//   res.json(await db.selectWord(0));
// }

async function getWord(n) {
  const x = await db.selectWord(n);
  return x;
}

async function printWord() {
  const fromDB=await getWord(2)
  // console.log(JSON.parse(fromDB).words);

  // console.log((typeof fromDB));
  // console.log(( fromDB));
  // console.log(( fromDB.words));

  

}
printWord();

async function setWord(){
  const startDate=new Date(Date.UTC(2022,4, 11, 4, 3, 4));
  const currentDate=new Date();
  const daysSince = Math.floor((currentDate-startDate)/(1000*3600*24))
  const  wordFromDb = await getWord(daysSince);
  console.log(wordFromDb);
  todaysWord=wordFromDb.words
}

setWord();
// const todaysWord = 'tiles';
app.listen(8080);

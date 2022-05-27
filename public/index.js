'use strict';
let found = false;
const squares = document.querySelector('#squares');
let currentRow = 0;
let numberOfLetters = 5;

function drawGrid() {
  document.querySelectorAll('.sq').forEach((item) => {
    item.remove();
  });
  document.querySelectorAll('.rows').forEach((item) => {
    item.remove();
  });
  document.querySelectorAll('.sixRows').forEach((item) => {
    item.remove();
  });
  for (let i = 0; i < 6; i++) {
    const a = document.createElement('div');
    a.classList = 'rows';
    squares.append(a);
    for (let i = 0; i < numberOfLetters; i++) {
      const s = document.createElement('div');
      s.textContent = '';
      s.classList = 'sq';
      a.append(s);
    }
  }
}

function drawKeyboard() {
  const keyboardletters = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['⌫', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Enter'],
  ];
  const keyboa = document.querySelector('.wholekeyboard');
  for (let i = 0; i < keyboardletters.length; i++) {
    const keybline = document.createElement('section');
    keybline.classList = 'keyboardline';
    keyboa.append(keybline);
    for (let j = 0; j < keyboardletters[i].length; j++) {
      const key = document.createElement('button');
      key.textContent = keyboardletters[i][j];
      if (keyboardletters[i][j] === 'Enter' ||
        keyboardletters[i][j] === '⌫') {
        key.classList = 'large';
      }
      keybline.append(key);
    }
  }
}

function setClickHandlers() {
  const buttons = document.querySelectorAll('button');
  for (const b of buttons) {
    b.addEventListener('click', handleClick);
  }
  document.addEventListener('keyup', handlekey);
}

function handleClick(e) {
  console.log(e.target.textContent);
  handler(e.target.textContent);
}

function handlekey(e) {
  handler(e.key);
}
async function enter() {
  let wordtocheck = '';
  const row = document.querySelectorAll('.rows');
  const squa = row[currentRow].querySelectorAll('.sq');
  if (isLineFull() && currentRow <= numberOfLetters && found === false) {
    currentRow++;
    for (const word of squa) {
      wordtocheck += word.textContent;
    }
    if (await isItAWord(wordtocheck)) {
      // console.log(wordtocheck);
      const checkcolourchanger = await checkWordOnServer(wordtocheck);
      // console.log(checkcolourchanger);
      isCorrect(checkcolourchanger, wordtocheck);
      if (checkcolourchanger === 'ccccc' || checkcolourchanger === 'cccccc') {
        found = true;
        finished();
      } else if (currentRow === 6) {
        lost();
      }
      setWords(wordtocheck);
    } else {
      const row = document.querySelectorAll('.rows');
      const squa = row[currentRow].querySelectorAll('.sq');
      for (const square of squa) {
        square.textContent = '';
      }
      message('Word Not Found');
      currentRow--;
    }
  } else {
    message('not enough letters');
  }
}

function colourkeyboard(letter, colour) {
  const keys = document.querySelectorAll('button');
  for (const key of keys) {
    if (key.textContent === letter) {
      if (colour === 'green') {
        key.style.background = 'green';
      } else if (colour === 'orange' && key.style.background !== 'green') {
        key.style.background = 'orange';
      } else if (colour === 'grey' && key.style.background === '') {
        key.style.background = 'grey';
      }
    }
  }
}

function isLineFull() {
  const row = document.querySelectorAll('.rows');
  const squa = row[currentRow].querySelectorAll('.sq');
  if (squa[squa.length - 1].textContent === '') {
    return false;
  } else {
    return true;
  }
}

function handler(key) {
  // console.log('handler');
  console.log(key);
  if (found !== true) {
    key = key.toLowerCase();
    if (key === 'backspace' || key === '⌫') {
      removeFromGrid();
    } else if (key === 'enter') {
      enter();
    } else if ((key >= 'a' && key <= 'z') && (key.length === 1)) {
      addToGrid(key);
    }
  }
  if (key === 'stats') {
    showStats();
  }
  if (key === '6 letters') {
    sixLetters();
    console.log('key.upper=' + key.upper);
  }
  if (key === '5 letters') {
    fiveLetters();
    console.log('key.upper=' + key.upper);
  }
}

function removeFromGrid() {
  const row = document.querySelectorAll('.rows');
  const squa = row[currentRow].querySelectorAll('.sq');
  let removed = false;
  for (let i = 0; i < squa.length - 1; i++) {
    if (squa[0].textContent === '') {
      removed = true;
    }
    if (squa[i + 1].textContent === '' && squa[i].textContent !== '') {
      squa[i].textContent = '';
      removed = true;
    }
  }
  if (removed === false) {
    squa[squa.length - 1].textContent = '';
  }
}

function addToGrid(key) {
  const row = document.querySelectorAll('.rows');
  const squa = row[currentRow].querySelectorAll('.sq');
  let inserted = false;
  for (const s of squa) {
    if (s.textContent === '' && inserted === false) {
      s.textContent = key;
      inserted = true;
    }
  }
}

function isCorrect(word, wordtocheck) {
  const colours = [];
  console.log(word, wordtocheck)
  if (word.length === numberOfLetters) {
    const row = document.querySelectorAll('.rows');
    for (let i = 0; i < numberOfLetters; i++) {
      if (word[i] === 'c') {
        colours.push('green');
      } else if (word[i] === 'w') {
        colours.push('grey');
      } else if (word[i] === 'p') {
        colours.push('orange');
      } else { colours.push('black'); }
    }
    setColours(colours);
    flip(currentRow, colours, wordtocheck);
  }
}

function flip(rowcurrent, colours, wordtocheck) {
  console.log(colours);
  const row = document.querySelectorAll('.rows');
  const sq = row[currentRow - 1].querySelectorAll('.sq');
  row[rowcurrent - 1].classList.toggle('flip');
  for (let i = 0; i < numberOfLetters; i++) {
    setTimeout(() => {
      sq[i].style.background = colours[i];
      colourkeyboard(wordtocheck[i], colours[i]);
    }, 250 + 250 * i);
  }
}
async function isItAWord(word) {
  const url = 'https://dictionary-dot-sse-2020.nw.r.appspot.com/' + encodeURIComponent(word);
  const response = await fetch(url);
  try {
    if (response.ok) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log('Some error');
  }
}
async function checkWordOnServer(word) {
  const payload = { msg: word };
  const response = await fetch('checker', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    return (await response.json());
  } else {
    (console.log('Error'));
    //  return 'error'
  }
}

function message(msg) {
  const messageBox = document.querySelector('p');
  messageBox.style.background = 'black';
  messageBox.textContent = msg;
  setTimeout(() => {
    messageBox.style.background = 'white';
    messageBox.textContent = '.';
  }, '1000');
}

function writeGrid() {
  let gridStorage = '';
  if (numberOfLetters === 5) {
    gridStorage = 'grid';
  } else if (numberOfLetters === 6) {
    gridStorage = 'grid6';
  }
  const dataAsString = localStorage.getItem(gridStorage);
  if (dataAsString) {
    const data = JSON.parse(dataAsString);
    const sqrs = document.querySelectorAll('.sq');
    for (let i = 0; i < data.colours.length; i++) {
      sqrs[i].textContent = data.words[i];
      sqrs[i].style.background = data.colours[i];
      colourkeyboard(data.words[i], data.colours[i]);
    }
    currentRow = data.currentRow;
    found = data.found;
  }
}

function setColours(colours) {
  let gridStorage = '';
  if (numberOfLetters === 5) {
    gridStorage = 'grid';
  } else if (numberOfLetters === 6) {
    gridStorage = 'grid6';
  }
  localStorage.getItem(gridStorage);
  const dataAsString = localStorage.getItem(gridStorage);
  if (dataAsString) {
    const data = JSON.parse(dataAsString);
    let storedColours = data.colours;
    storedColours = storedColours.concat(colours);
    const grid = { words: data.words, colours: storedColours, todaysDate: data.todaysDate, currentRow: data.currentRow, found };
    localStorage.setItem(gridStorage, JSON.stringify(grid));
  }
}

function setWords(colours) {
  let gridStorage = '';
  if (numberOfLetters === 5) {
    gridStorage = 'grid';
  } else if (numberOfLetters === 6) {
    gridStorage = 'grid6';
  }
  localStorage.getItem(gridStorage);
  const dataAsString = localStorage.getItem(gridStorage);
  if (dataAsString) {
    const data = JSON.parse(dataAsString);
    let storedWords = data.words;
    storedWords = storedWords + colours;
    const grid = { words: storedWords, colours: data.colours, todaysDate: data.todaysDate, currentRow, found };
    localStorage.setItem(gridStorage, JSON.stringify(grid));
  }
}

function todaysANewDay() {
  localStorage.removeItem('grid');
  localStorage.removeItem('grid6');
  // const sqrs = document.querySelectorAll('.sq');
  const words = '';
  const colours = [];
  const date = new Date();
  const todaysDate = [date.getMonth(), date.getDate(), date.getFullYear()];
  currentRow = 0;
  const grid = { words, colours, todaysDate, currentRow, found: false };
  localStorage.setItem('grid', JSON.stringify(grid));
  localStorage.setItem('grid6', JSON.stringify(grid));
}

function isTodayANewDay() {
  const dataAsString = localStorage.getItem('grid');
  if (dataAsString) {
    const date = new Date();
    const todaysDate = [date.getMonth(), date.getDate(), date.getFullYear()];
    const lastDate = JSON.parse(dataAsString).todaysDate;
    // [4, 5, 2022]
    // if
    if ((todaysDate.toString() !== lastDate.toString())) {
      todaysANewDay();
    }
  } else {
    todaysANewDay();
  }
}

function addScores(numOfTires) {
  const scoresAsString = localStorage.getItem('scores');
  if (scoresAsString) {
    const scoresObject = JSON.parse(scoresAsString);
    if (numOfTires === 1) {
      scoresObject.one += 1;
    }
    if (numOfTires === 2) {
      scoresObject.two += 1;
    }
    if (numOfTires === 3) {
      scoresObject.three += 1;
    }
    if (numOfTires === 4) {
      scoresObject.four += 1;
    }
    if (numOfTires === 5) {
      scoresObject.five += 1;
    }
    if (numOfTires === 6) {
      scoresObject.six += 1;
    }
    localStorage.setItem('scores', JSON.stringify(scoresObject));
  } else {
    createScores();
    addScores(numOfTires);
  }
}

function finished() {
  message(`Well Done! You did it in ${currentRow} tries`);
  addScores(currentRow);
  setTimeout(() => {
    showStats();
  }, 2000);
}

function createScores() {
  const scoreBoard = { one: 0, two: 0, three: 0, four: 0, five: 0, six: 0 };
  localStorage.setItem('scores', JSON.stringify(scoreBoard));
}
async function lost() {
  message('better luck next time');
  const response = await fetch('word' + numberOfLetters);
  let todaysWord;
  if (response.ok) {
    todaysWord = await response.json();
  } else {
    todaysWord = 'failed to load';
  }
  setTimeout(() => {
    message(`Todays word was ${todaysWord}`);
  }, 2000);
  setTimeout(() => {
    showStats();
  }, 4000);
}

function showStats() {
  const scores = document.querySelector('#scores');
  if (scores.style.display === 'none' || scores.style.display === '') {
    scores.style.display = 'inline-block';
    appendScores();
  } else {
    scores.style.display = 'none';
  }
}

function appendScores() {
  // for (let i=0; i>=6;i++){
  // }
  const scoresAsString = localStorage.getItem('scores');
  if (scoresAsString) {
    document.querySelectorAll('h3').forEach((item) => {
      if (item.textContent !== 'Attempts') {
        item.remove();
      }
    });
    const scoresElement = document.querySelector('#scores');
    if (scoresAsString) {
      const scoresObject = JSON.parse(scoresAsString);
      // for (let i = 0; i <= 6; i++) {
      for (const [key, value] of Object.entries(scoresObject)) {
        const entry = document.createElement('h3');
        entry.textContent = `${key}: ${value}`;
        scoresElement.append(entry);
      }
    }
  } else {
    createScores();
    appendScores();
  }
}

function sixLetters() {
  numberOfLetters = 6;
  currentRow = 0;
  console.log(numberOfLetters);
  document.querySelectorAll('button').forEach((item) => {
    item.style.background = '';
  });
  drawGrid();
  writeGrid();
  const letterButton = document.querySelector('.letters');
  letterButton.textContent = '5 letters';
  document.querySelectorAll('.rows').forEach((item) => {
    item.classList.add('sixRows');
  });
}

function fiveLetters() {
  numberOfLetters = 5;
  currentRow = 0;
  console.log(numberOfLetters);
  document.querySelectorAll('button').forEach((item) => {
    item.style.background = '';
  });
  drawGrid();
  writeGrid();
  const letterButton = document.querySelector('.letters');
  letterButton.textContent = '6 letters';
  document.querySelectorAll('.rows').forEach((item) => {
    item.classList.remove('sixRows');
  });
}

function init() {
  drawGrid();
  drawKeyboard();
  isTodayANewDay();
  writeGrid();
  setClickHandlers();
}
init();

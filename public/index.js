// function runing(e) {
//     console.log(b.getText);
//     console.log(e.textContent);
// }
// const b = document.querySelector('.keyboard');
// console.log(b);
// b.addEventListener("click", runing, b);


// const squares = document.querySelector('#squares');
// console.log(squares)

// for (let i = 0; i < 30; i++) {
//     const s = document.createElement('div');
//     s.textContent = '';
//     s.classList = "sq";
//     squares.append(s)
// }
'use strict';
let found = false;
const squares = document.querySelector('#squares');

for (let i = 0; i < 6; i++) {
  const a = document.createElement('div');
  a.classList = 'rows';
  squares.append(a);
  for (let i = 0; i < 5; i++) {
    const s = document.createElement('div');
    s.textContent = '';
    s.classList = 'sq';
    a.append(s);
  }
}

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
    console.log(keyboardletters[i][j]);
    const key = document.createElement('button');
    key.textContent = keyboardletters[i][j];

    if (keyboardletters[i][j] === 'Enter' ||
      keyboardletters[i][j] === '⌫') {
      console.log('AAA');
      key.classList = 'large';
    }
    keybline.append(key);
  }
}
let currentRow = 0;
// s.classList.add('sq');


// const dup = document.querySelector(selector);


// const newEl = document.createElement(dup.tagName);
// newEl.textContent = dup.textContent;
// dup.parentNode.append(newEl);


function handleClick(e) {
  //  const out = document.querySelector('#squares');
  // out.textContent = 'You clicked ' + e.target.textContent;

  handler(e.target.textContent);
}

function handlekey(e) {
  //  const out = document.querySelector('#squares');
  // out.textContent = 'You clicked ' + e.target.textContent;
  // out.append(e.key);

  // console.log(e.key);
  // if (e.key == "Backspace") {
  //     removeFromGrid()
  // } else {
  //     addToGrid(e.key);
  // }
  console.log(e.key);
  handler(e.key);
}

async function enter() {
  console.log('WELCOME TO THE ENTER FUNCTION');
  let wordtocheck = '';
  const row = document.querySelectorAll('.rows');
  const squa = row[currentRow].querySelectorAll('.sq');

  if (isLineFull() && currentRow <= 5 && found === false) {
    currentRow++;
    for (const word of squa) {
      wordtocheck += word.textContent;
    }
    // and if word is real
    //  if (words.includes(wordtocheck)) {
    if (await isItAWord(wordtocheck)) {
      console.log(wordtocheck);
      const checkcolourchanger = await checkWordOnServer(wordtocheck);
      console.log(checkcolourchanger);
      isCorrect(checkcolourchanger, wordtocheck);
      if (checkcolourchanger === 'ccccc') {
        found = true;
      }
      setWords(wordtocheck);
    } else {
      const row = document.querySelectorAll('.rows');
      const squa = row[currentRow].querySelectorAll('.sq');
      for (const square of squa) {
        square.textContent = '';
      }
      message('Word Not Found');

    }
  } else {
    message('not enough letters');
  }
}


//  function checkword(wordtocheck) {
//      let colourword = "";
//      console.log("WORDTOCHECK" + wordtocheck);
//      for (let i = 0; i < wordtocheck.length; i++) {
//          console.log("inforloop")
//          if (wordtocheck[i] == todaysWord[i]) {
//              colourword += "c";
//          } else if (todaysWord.includes(wordtocheck[i])) {
//              colourword += "p";
//          } else {
//              colourword += "w";
//          }
//          console.log(colourword);

//      }
//      console.log(colourword);
//      return colourword;

//  }

// function isLineFull() {
//     const squa = document.querySelectorAll('.sq');
//     let found = false;
//     let position = 0;
//     for (let i = 0; i < 30; i++) {
//         if (found == false && squa[i].textContent == '') {
//             found = true;
//             position = i;
//         }

//     }

//     if (position == 0) {
//         return 0;
//     } else if (((position) % 5) == 0) {
//         return position - 1;
//     } else return 0;
// }
function colourkeyboard(letter, colour) {
  const keys = document.querySelectorAll('button');
  for (const key of keys) {
    if (key.textContent === letter) {
      if (key.style.background !== 'green') {
        key.style.background = colour;
      }
    }
  }
}

function isLineFull() {
  const row = document.querySelectorAll('.rows');
  const squa = row[currentRow].querySelectorAll('.sq');
  if (squa[4].textContent === '') {
    return false;
  } else {
    return true;
  }
}

// function handler(key) {
//   if (found != true) {
//     if (key == "Backspace" || key == "⌫") {
//       removeFromGrid();
//     } else if (key == 'ENTER' || key == 'Enter') {
//       enter();
//     } else if (((key >= 'a' && key <= 'z') || (key >= 'A' && key <= 'Z') && key.length == 1)) {
//       addToGrid(key.toLowerCase());
//     } else {}
//   } else {}

// }
// function handler(key) {
//   if (found == true) {} else if (key == "Backspace" || key == "⌫") {
//     removeFromGrid();
//   } else if (key == 'ENTER' || key == 'Enter') {
//     enter();
//   } else
//   if (((key >= 'a' && key <= 'z') || (key >= 'A' && key <= 'Z') && key.length == 1)) {

//     addToGrid(key.toLowerCase());
//   } else {}
// }

function handler(key) {
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
}

// function removeFromGrid() {
//     const squa = document.querySelectorAll('.sq');
//     let removed = false
//     for (let i = 0; i < squa.length; i++) {
//         if (squa[i].textContent != '' && (squa[i + 1].textContent == '' && removed == false) {
//                 squa[i].textContent == '';
//                 removed = True;
//                 console.log("if");
//             }
//         }
//     }
// }

function removeFromGrid() {
  const row = document.querySelectorAll('.rows');
  const squa = row[currentRow].querySelectorAll('.sq');
  let removed = false;
  for (let i = 0; i < 4; i++) {
    // if (squa[i].textContent != '' && squa[i + 1].textContent == '') {
    //     squa[i].textContent == '';
    //     removed = true;
    //     console.log("if");
    // } else {
    //     console.log("ERROR");
    //     console.log(squa[i].textContent);
    //     value = i-1;
    //     console.log(value);
    //     console.log(squa[value].textContent);

    // console.log("i", i, "   ", squa[i].textContent);
    // console.log("i+1", i + 1, "   ", squa[i + 1].textContent);
    if (squa[0].textContent === '') {
      removed = true;
    }
    if (squa[i + 1].textContent === '' && squa[i].textContent !== '') {
      squa[i].textContent = '';
      removed = true;
    }
  }
  if (removed === false) {
    squa[4].textContent = '';
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
  if (word.length === 5) {
    const row = document.querySelectorAll('.rows');
    for (let i = 0; i < row.length - 1; i++) {
      console.log(word[i]);
      if (word[i] === 'c') {
        colours.push('green');
      } else if (word[i] === 'w') {
        colours.push('grey');
      } else if (word[i] === 'p') {
        colours.push('orange');
      } else { colours.push('black'); }

      // setTimeout(() => {
      // sq[i].classList.add('flip');

      // console.log('Flip');
      // }, 1000);
      // colourkeyboard(wordtocheck[i], colour);
    }
    setColours(colours);
    flip(currentRow, colours, wordtocheck);
  }
}
// CHECK THIS
function flip(rowcurrent, colours, wordtocheck) {
  const row = document.querySelectorAll('.rows');
  const sq = row[currentRow - 1].querySelectorAll('.sq');

  row[rowcurrent - 1].classList.toggle('flip');
  console.log(colours);

  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      sq[i].style.background = colours[i];
      colourkeyboard(wordtocheck[i], colours[i]);
      // console.log(colours.shift());
    }, 250 + 250 * i);
  }
}

const buttons = document.querySelectorAll('button');
for (const b of buttons) {
  b.addEventListener('click', handleClick);
  //   document.addEventListener('keyup', handlekey);
}
document.addEventListener('keyup', handlekey);

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
    //  const checked = await response.json();
    //  check = checked;
    //  console.log("MESSAGE = " + checked);
    //  return await response.json();
    return (await response.json());
  } else {
    (console.log('Error'));
    //  return 'error'
  }

  //  console.log(check);
  //  return check;
}

function message(msg) {
  const messageBox = document.querySelector('p');
  messageBox.style.background = 'black';
  messageBox.textContent = msg;
  // wait 5 seconds
  //  setTimeout(5000);
  setTimeout(() => {
    messageBox.style.background = 'white';
    messageBox.textContent = '.';
  }, '1000');
  //  messageBox.style.background = 'black';
  //  messageBox.textContent = '';
}

// function readGrid() {
//   const sqrs = document.querySelectorAll('.sq');
//   let words = '';
//   let colours = '';
//   for (const s of sqrs) {
//     words = words.concat(s.textContent);
//     colours = colours.concat(s.style.background + ',');
//   }
//   const date = new Date();

//   const todaysDate = [date.getMonth(), date.getDate(), date.getFullYear()];
//   const grid = { words, colours, todaysDate, currentRow };
//   localStorage.setItem('grid', JSON.stringify(grid));
// }

function writeGrid() {
  const dataAsString = localStorage.getItem('grid');
  if (dataAsString) {
    const data = JSON.parse(dataAsString);
    const sqrs = document.querySelectorAll('.sq');

    //  let data = { words: 'greencrane', colours: 'grey,green,grey,grey,grey,grey,green,grey,grey,grey,,,,,,,,,,,,,,,,,,,,,' }
    for (let i = 0; i < data.colours.length; i++) {
      sqrs[i].textContent = data.words[i];
      sqrs[i].style.background = data.colours[i];

      colourkeyboard(data.words[i], data.colours[i]);
    }

    currentRow = data.currentRow;
    // const rowsindata = data.words.length / 5;
    // for (let i = 0; i < rowsindata; i++) {
    //   await enter();
    // }
  }
}

function setColours(colours) {
  localStorage.getItem('grid');
  const dataAsString = localStorage.getItem('grid');
  if (dataAsString) {
    const data = JSON.parse(dataAsString);
    let storedColours = data.colours;
    storedColours = storedColours.concat(colours);
    const grid = { words: data.words, colours: storedColours, todaysDate: data.todaysDate, currentRow: data.currentRow };
    localStorage.setItem('grid', JSON.stringify(grid));
  }
}

function setWords(colours) {
  localStorage.getItem('grid');
  const dataAsString = localStorage.getItem('grid');
  if (dataAsString) {
    const data = JSON.parse(dataAsString);
    let storedWords = data.words;
    storedWords = storedWords + colours;
    const grid = { words: storedWords, colours: data.colours, todaysDate: data.todaysDate, currentRow };
    localStorage.setItem('grid', JSON.stringify(grid));
  }
}

function todaysANewDay() {
  localStorage.removeItem('grid');
  const sqrs = document.querySelectorAll('.sq');
  const words = '';
  const colours = [];
  // for (const s of sqrs) {
  //   words = words.concat(s.textContent);
  //   colours = colours.concat(s.style.background + ',');
  // }
  const date = new Date();
  const todaysDate = [date.getMonth(), date.getDate(), date.getFullYear()];
  currentRow = 0;
  const grid = { words, colours, todaysDate, currentRow };
  localStorage.setItem('grid', JSON.stringify(grid));
}

function isTodayANewDay() {
  const dataAsString = localStorage.getItem('grid');
  if (dataAsString) {
    const date = new Date();

    const todaysDate = [date.getMonth(), date.getDate(), date.getFullYear()];
    const lastDate = JSON.parse(dataAsString).todaysDate;
    console.log('DATE= ' + lastDate[2]);
    // [4, 5, 2022]
    // if

    if ((todaysDate.toString() !== lastDate.toString())) {
      console.log('TodaysDate = ', typeof todaysDate);
      console.log('LastDate = ', typeof lastDate);

      todaysANewDay();
    }
  } else {
    todaysANewDay();
  }
}
isTodayANewDay();
writeGrid();

// const todaysWord = "again";

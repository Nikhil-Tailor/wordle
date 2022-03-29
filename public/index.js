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
 "use strict";
 const squares = document.querySelector('#squares');

 for (let i = 0; i < 6; i++) {

     const a = document.createElement('div');
     a.classList = "rows"
     squares.append(a);
     for (let i = 0; i < 5; i++) {
         const s = document.createElement('div');
         s.textContent = '';
         s.classList = "sq";
         a.append(s)
     }
 }

 const keyboardletters = [
     ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
     ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
     ['⌫', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Enter']
 ]
 const keyboa = document.querySelector('.wholekeyboard');

 for (let i = 0; i < keyboardletters.length; i++) {
     const keybline = document.createElement('section');
     keybline.classList = 'keyboardline';
     keyboa.append(keybline);
     for (let j = 0; j < keyboardletters[i].length; j++) {
         console.log(keyboardletters[i][j])
         const key = document.createElement('button');
         key.textContent = keyboardletters[i][j];

         if (keyboardletters[i][j] == 'Enter' ||
             keyboardletters[i][j] == '⌫') {
             console.log("AAA");
             key.classList = 'large';

         }
         keybline.append(key);

     }
 }


 let currentRow = 0
     // s.classList.add('sq');


 // const dup = document.querySelector(selector);


 // const newEl = document.createElement(dup.tagName);
 // newEl.textContent = dup.textContent;
 // dup.parentNode.append(newEl);



 function handleClick(e) {
     const out = document.querySelector('#squares');
     // out.textContent = 'You clicked ' + e.target.textContent;

     handler(e.target.textContent);
 }

 function handlekey(e) {
     const out = document.querySelector('#squares');
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

 function enter() {
     let wordtocheck = "";
     const row = document.querySelectorAll('.rows')
     const squa = row[currentRow].querySelectorAll('.sq');

     if (isLineFull() && currentRow < 5) {
         for (const word of squa) {
             wordtocheck += word.textContent;
         }
         //and if word is real
         console.log(wordtocheck);
         currentRow++;
     }
 }

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

 function isLineFull() {
     const row = document.querySelectorAll('.rows')
     const squa = row[currentRow].querySelectorAll('.sq');
     if (squa[4].textContent == '') {
         return false;
     } else {
         return true;
     }
 }

 function handler(key) {
     if (key == "Backspace" || key == "⌫") {
         removeFromGrid();
     } else if (key == 'ENTER' || key == 'Enter') {
         enter();
     } else if ((key >= 'a' && key <= 'z') || (key >= 'A' && key <= 'Z')) {

         addToGrid(key);
     } else {}
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
     const row = document.querySelectorAll('.rows')
     const squa = row[currentRow].querySelectorAll('.sq');
     let removed = false
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
         if (squa[0].textContent == '') {
             removed = true;
         }
         if (squa[i + 1].textContent == '' && squa[i].textContent != '') {
             squa[i].textContent = '';
             removed = true;
         } else {}
     }
     if (removed == false) {
         squa[4].textContent = '';
     }
 }






 function addToGrid(key) {
     const row = document.querySelectorAll('.rows')
     const squa = row[currentRow].querySelectorAll('.sq');
     let inserted = false;
     for (const s of squa) {
         if (s.textContent == '' && inserted == false) {
             s.textContent = key;
             inserted = true;
         }
     }
 }
 const buttons = document.querySelectorAll('button');
 for (const b of buttons) {
     b.addEventListener('click', handleClick);
     document.addEventListener('keyup', handlekey);

 }
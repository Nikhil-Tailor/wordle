import { words } from 'popular-english-words';
const q = 'INSERT INTO wordsTable (words,wordsSix) VALUES';
let wordsq = '';
const wordsList = words.getMostPopularLength(2000, 5);
const wordsListSix = words.getMostPopularLength(2000, 6);
for (let i = 0; i < 2000; i++) {
  wordsq += ' (\'' + wordsList[i] + '\',\'' + wordsListSix[i] + '\'),';
}
console.log(q + wordsq.slice(0, wordsq.length - 1) + ';');

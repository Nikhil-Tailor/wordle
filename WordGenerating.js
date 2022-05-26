import { words } from 'popular-english-words';
const q = 'INSERT INTO wordsTable (words) VALUES';
let wordsq = '';
const wordsList = words.getMostPopularLength(2000, 5);

for (const words of wordsList) {
  wordsq += ' (\'' + words + '\'),';
}
console.log(q + wordsq.slice(0, wordsq.length - 1) + ';');

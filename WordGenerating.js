import {words} from 'popular-english-words'
let x = words.getMostPopularLength(2000,5)
console.log(x);

for (const words of x){
    console.log(words)
}
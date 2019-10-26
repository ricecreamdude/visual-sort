import _ from 'underscore';


/* 
* @params {array} array
* From Underscore - Utilizes the 'Fisher-Yates shuffle'
* https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
*/

//TO DO - IMPLEMENT THIS MYSELF
export function shuffleArray(array){
  let answer = _.shuffle(array);
  
  return answer;
}
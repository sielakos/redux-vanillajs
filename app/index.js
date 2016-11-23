import {createStore} from 'redux';
import isOdd from 'utils/isOdd';

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

console.log(document.body);

numbers.forEach(number => {
  const node = document.createElement('div');

  node.innerHTML = `${number} => ${isOdd(number)}`;

  document.body.appendChild(node);
});

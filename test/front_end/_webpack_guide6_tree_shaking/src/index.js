import { cube } from './math.js';

function component() {
  const element = document.createElement('pre');

  // Lodash, now imported by this script
  const n = 5;
  element.innerHTML = ['Hello webpack!', '5 cubed is equal to ' + cube(n)].join(
    '\n\n',
  );

  return element;
}

document.body.appendChild(component());

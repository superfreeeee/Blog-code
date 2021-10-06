// 1.
const passProps = (...props) => {
  console.log('[passProps] props', props);
  return props;
};

const props = passProps`A${(props) => props[0]}B${(props) => props[1]}`;

console.log('props', props);

// 2.
const createGreeting = (name) => `Hello ${name}!`;
console.log(createGreeting('superfree'));

const createGreeting2 = ((strs, nameExp) => {
  return (name) => `${strs[0]}${nameExp(name)}${strs[1]}`;
})`Hello ${(name) => name.toUpperCase()}!`;

console.log(createGreeting2('superfree'));

// 3.
const createObj = (strs, ...expressions) => {
  console.log('strs', strs);
  console.log('expressions', expressions);
  const obj = {};
  let i = expressions.length;
  while (i-- > 0) {
    obj[strs[i]] = expressions[i];
  }
  return obj;
};

const name = 'superfree';
const age = 21;
const obj = createObj`name${name}age${age}`;
console.log('obj', obj);

// 4.
const createStyleFactory = (strs, ...expressions) => {
  return (props) => {
    let i = strs.length - 1;
    let s = strs[i];
    while (i-- > 0) {
      s = strs[i] + expressions[i](props) + s;
    }
    return s;
  };
};

const createStyle = createStyleFactory`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background: ${(props) => props.background || '#000'};
`;

console.log(createStyle({ width: 111, height: 222 }));

document
  .querySelector('.block')
  .setAttribute('style', createStyle({ width: '200px', height: '40px', background: '#f0f0f0' }));

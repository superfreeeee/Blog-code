import createObservable from '../observable';

const obj = createObservable({ name: 'Jason' });

console.log('obj', obj);

obj.subscribe((obj) => {
  console.log('on obj update', obj);
});

obj.name = 'Jack';

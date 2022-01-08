import addOne from '.';

test('general test', () => {
  Array.from({ length: 100 }, (_, i) => {
    expect(addOne(i)).toBe(i + 1);
  });
});

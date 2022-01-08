import addTwo from '.';

test('general test', () => {
  Array.from({ length: 100 }, (_, i) => {
    expect(addTwo(i)).toBe(i + 2);
  });
});

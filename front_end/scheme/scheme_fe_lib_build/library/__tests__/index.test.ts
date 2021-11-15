import greeting from '../src/index';

describe('index test', () => {
  test('test 1', () => {
    expect(greeting).not.toThrow();
  });
});

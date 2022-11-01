export function createTestWrapper() {
  let testId = 0;
  return function testWrapper(task: VoidFunction) {
    const id = (testId = testId + 1);
    console.log(`====== test ${id} ======`);
    task();
    console.log('===== test end =====\n');
  };
}

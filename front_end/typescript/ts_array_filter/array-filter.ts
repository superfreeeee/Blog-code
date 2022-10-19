const arr = [123, '456', true, 789, new Date()];
// const arr: (string | number | boolean | Date)[]

// 0. 使用 Array.prototype.filter => 类型错误
const arr2 = arr.filter((item) => typeof item === 'number');
// const arr: (string | number | boolean | Date)[]

// 1. 使用 Array.prototype.reduce + 类型断言保证类型
const arr3 = arr.reduce((res, item) => {
  if (typeof item === 'number') {
    res.push(item);
  } else if (typeof item === 'string') {
    // res.push(item);
    // Argument of type 'string' is not assignable
    //   to parameter of type 'number'.ts(2345)
  }
  return res;
}, [] as number[]);
// const arr3: number[]

// 2. 查看类型定义
// /**
//  * Returns the elements of an array that meet the condition specified in a callback function.
//  * @param predicate A function that accepts up to three arguments. The filter method calls the predicate function one time for each element in the array.
//  * @param thisArg An object to which the this keyword can refer in the predicate function. If thisArg is omitted, undefined is used as the this value.
//  */
// filter<S extends T>(predicate: (value: T, index: number, array: T[]) => value is S, thisArg?: any): S[];
// /**
//   * Returns the elements of an array that meet the condition specified in a callback function.
//   * @param predicate A function that accepts up to three arguments. The filter method calls the predicate function one time for each element in the array.
//   * @param thisArg An object to which the this keyword can refer in the predicate function. If thisArg is omitted, undefined is used as the this value.
//   */
// filter(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): T[];

// 3. 使用 predicate 预测类型
const arr4 = arr.filter((item): item is number => typeof item === 'number');
// const arr4: number[]

// 4. 风险：predicate 为断言表达式，无法识别内部逻辑
const arr5 = arr.filter((item): item is number => typeof item === 'string');
// const arr5: number[]

// 5. 推荐写法：单独抽离类型判断
const isNumber = (item: any): item is number => typeof item === 'number';
const arr6 = arr.filter(isNumber);
// const arr6: number[]

const arr7 = arr.filter((item) => typeof item === 'number') as number[];
// const arr7: number[]

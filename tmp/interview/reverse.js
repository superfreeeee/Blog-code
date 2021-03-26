function reverse(s) {
  return s.slice().reverse().join('')
}

// function reverse(s) {
//   let res = ''
//   for(let i=0; i<s.length; i++)
// }

// 有字符串var str ='abc345efgabcab',请写出3条JS语句分别实现如下3个功能：
// 1）去掉字符串中的a、b、c字符，形成结果：'345efg'
// 2）将字符串中的数字用中括号括起来，形成结果：'abc[3][4][5]efgabcab'
// 3）将字符串中的每个数字的值分别乘以2，形成结果：'abc6810efgabcab'

function f1(s) {
  return s.replace(/[abc]/g, '')
}

function f2(s) {
  let res = ''
  const digit = /[0-9]/
  for (let i = 0; i < s.length; i++) {
    if (s.charAt(i).match(digit)) {
      res += `[${s.charAt(i)}]`
    } else {
      res += s.charAt(i)
    }
  }
  return res
}

function f3(s) {
  let res = ''
  const digit = /[0-9]/
  for (let i = 0; i < s.length; i++) {
    if (s.charAt(i).match(digit)) {
      res += `${2 * s.charAt(i)}`
    } else {
      res += s.charAt(i)
    }
  }
  return res
}

// 一个数组par中存放有多个人员的信息，每个人员的信息由年龄age和姓名name组成，如{age:2, name:'xx'}。
// 请写一段JS程序，对这个数组按年龄从小到大进行排序。

function sortPeople(people) {
  people.sort((p1, p2) => p1.age - p2.age)
  return people
}

function binarySearch(nums, target) {
  function _binarySearch(nums, target, l, r) {
    if (l > r) return -1
    const mid = (l + r) / 2
    if (nums[mid] === target) return mid
    else if (target < nums[mid]) return _binarySearch(nums, target, l, mid - 1)
    else return _binarySearch(nums, target, mid + 1, r)
  }
  return _binarySearch(nums, target, 0, nums.length - 1)
}

function debounce(cb, ms) {
  let timer = null
  return () => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      cb()
    }, ms)
  }
}

function throttle(cb, ms) {
  let valid = true
  return () => {
    if (!valid) return
    valid = false
    setTimeout(() => {
      cb()
      valid = true
    }, ms)
  }
}

// const { getCount, inc } = (function() {
//   var count = 0
//   function inc() {
//     count++
//   }
//   function getCount() {
//     return count
//   }
//   return {
//     getCount,
//     inc
//   }
// }())

// console.log(getCount())
// inc()
// console.log(getCount())
// const greeting = (function(name) {
//   return `hello ${name}`
// }('John'))
// console.log(greeting)

// var b = (function(i){
//   var a = i
//   return a
// }(1))
// console.log(b)
// console.log(a)

// for(var i=0 ; i<10 ; i++) {
//   (function(i) {
//     setTimeout(function() {
//       console.log(i)
//     }, 0)
//   }(i))
// }


// var { greeting, setName } = (function() {
//   var name = 'John'
  
//   function greeting() {
//     console.log(`Hello ${name}`)
//   }

//   function setName(val) {
//     name = val
//   }

//   return {
//     greeting,
//     setName
//   }
// }())

// greeting()
// setName('Andy')
// greeting()


// const SquareModule = (function(){
//   var _length = 100
  
//   function setLength(length) {
//     console.log(`set length = ${length}`)
//     _length = length
//   }

//   function area() {
//     return _length * _length
//   }

//   return {
//     setLength,
//     area
//   }
// }())

// console.log(`area = ${SquareModule.area()}`)
// SquareModule.setLength(20)
// console.log(`area = ${SquareModule.area()}`)

// const PrimeCreator = (function() {
//   let primes = [2,3,5]
//   let index = -1
  
//   function reset() {
//     index = -1
//   }

//   function nextPrime() {
//     index++
//     if(index >= primes.length) {
//       createNextPrime()
//     }
//     return primes[index]
//   }

//   function createNextPrime() {
//     let nextPrime = primes[primes.length - 1] + 1
//     let isPrime = false
//     while(!isPrime) {
//       isPrime = true
//       for(let prime of primes) {
//         if(nextPrime % prime === 0) {
//           nextPrime++
//           isPrime = false
//           break
//         }
//       }
//       if(isPrime) {
//         break
//       }
//     }
//     primes.push(nextPrime)
//   }

//   return {
//     reset,
//     nextPrime
//   }
// }())

// for(let i=0 ; i< 10 ; i++) {
//   console.log(PrimeCreator.nextPrime())
// }

const ModuleManager = (function Manager() {
  const modules = {}

  function load(name, deps, impl) {
    for(let i=0 ; i<deps.length ; i++) {
      deps[i] = modules[deps[i]]
    }
    modules[name] = impl.apply(null, deps)
  }

  function get(name) {
    return modules[name]
  }

  return {
    load,
    get
  }
}())

ModuleManager.load('Add', [], function() {
  function add(x, y) {
    return x + y
  }

  return {
    add
  }
})

ModuleManager.load('Mul', ['Add'], function(Add) {
  function mul(x, y) {
    let sum = 0
    while(y-- > 0) {
      sum = Add.add(sum, x)
    }
    return sum
  }

  return {
    mul
  }
})

const Add = ModuleManager.get('Add')
const Mul = ModuleManager.get('Mul')
console.log(Add.add(1,2))
console.log(Mul.mul(3,4))
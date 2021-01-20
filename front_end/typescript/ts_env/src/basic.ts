console.log('----- basic types -----')

// primitive
const b: boolean = true
const nDec: number = 101
const nBin: number = 0b101
const nOct: number = 0o101
const nHex: number = 0x101
const s: string = 'hello'
console.log(`b: boolean = ${b}`)
console.log(`nDec: number = ${nDec}`)
console.log(`nBin: number = ${nBin}`)
console.log(`nOct: number = ${nOct}`)
console.log(`nHex: number = ${nHex}`)
console.log(`s: string = ${s}`)

// array
const nums: number[] = [ 1, 2, 3 ]
const nums2: Array<number> = [ 4, 5, 6 ]
console.log(`nums: number[] = ${nums}`)
console.log(`nums2: Array<number> = ${nums2}`)

// tuple
const t: [number, string] = [ 1, 'name' ]
console.log(`t: [number, string] = ${t}`)

// enum
enum Color {
  BLUE,
  RED,
  GREEN
}
const c_blue: Color = Color.BLUE
const c_red: Color = Color.RED
const c_green: Color = Color.GREEN
console.log(`c_blue: Color: ${c_blue}`)
console.log(`c_red: Color: ${c_red}`)
console.log(`c_green: Color: ${c_green}`)

export default null

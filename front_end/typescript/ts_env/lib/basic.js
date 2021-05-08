console.log('----- basic types -----');
// primitive
const b = true;
const nDec = 101;
const nBin = 0b101;
const nOct = 0o101;
const nHex = 0x101;
const s = 'hello';
console.log(`b: boolean = ${b}`);
console.log(`nDec: number = ${nDec}`);
console.log(`nBin: number = ${nBin}`);
console.log(`nOct: number = ${nOct}`);
console.log(`nHex: number = ${nHex}`);
console.log(`s: string = ${s}`);
// array
const nums = [1, 2, 3];
const nums2 = [4, 5, 6];
console.log(`nums: number[] = ${nums}`);
console.log(`nums2: Array<number> = ${nums2}`);
// tuple
const t = [1, 'name'];
console.log(`t: [number, string] = ${t}`);
// enum
var Color;
(function (Color) {
    Color[Color["BLUE"] = 0] = "BLUE";
    Color[Color["RED"] = 1] = "RED";
    Color[Color["GREEN"] = 2] = "GREEN";
})(Color || (Color = {}));
const c_blue = Color.BLUE;
const c_red = Color.RED;
const c_green = Color.GREEN;
console.log(`c_blue: Color: ${c_blue}`);
console.log(`c_red: Color: ${c_red}`);
console.log(`c_green: Color: ${c_green}`);
export default null;

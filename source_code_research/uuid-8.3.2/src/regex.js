/**
 * uuid 正则表达式
 * UUID := time-low(8) '-'
 *         time-mid(4) "-"
 *         time-high-and-version(4) "-"
 *         clock-seq-and-reserved(2)
 *         clock-seq-low(2) "-" node(12)
 * time-low               = 4 hexOctet  = 8 位
 * time-mid               = 2 hexOctet  = 4 位
 * time-high-and-version  = 2 hexOctet  = 4 位
 * clock-seq-and-reserved = 1 hexOctet  = 2 位
 * clock-seq-low          = 1 hexOctet  = 2 位
 * node                   = 6 hexOctet  = 12 位
 * hexOctet = hexDigit hexDigit   （2 位 16 进制数）
 * hexDigit = "0" / "1" / "2" / "3" / "4" / "5" / "6" / "7" / "8" / "9" /
 *            "a" / "b" / "c" / "d" / "e" / "f" /
 *            "A" / "B" / "C" / "D" / "E" / "F"
 *
 * NIL := 00000000-0000-0000-0000-000000000000
 */
// ? Read
export default /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i; // 忽略大小写

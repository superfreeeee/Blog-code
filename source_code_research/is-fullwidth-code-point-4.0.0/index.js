/* eslint-disable yoda */

/**
 * 检查是否为全形文字（两格宽文字）
 * @param {*} codePoint
 * @returns
 */
// ? Read
export default function isFullwidthCodePoint(codePoint) {
  if (!Number.isInteger(codePoint)) {
    return false;
  }

  // Code points are derived from:
  // https://unicode.org/Public/UNIDATA/EastAsianWidth.txt
  return (
    codePoint >= 0x1100 &&
    (codePoint <= 0x115f || // Hangul Jamo
      codePoint === 0x2329 || // LEFT-POINTING ANGLE BRACKET
      codePoint === 0x232a || // RIGHT-POINTING ANGLE BRACKET
      // CJK Radicals Supplement .. Enclosed CJK Letters and Months
      (0x2e80 <= codePoint && codePoint <= 0x3247 && codePoint !== 0x303f) ||
      // Enclosed CJK Letters and Months .. CJK Unified Ideographs Extension A
      (0x3250 <= codePoint && codePoint <= 0x4dbf) ||
      // CJK Unified Ideographs .. Yi Radicals
      (0x4e00 <= codePoint && codePoint <= 0xa4c6) ||
      // Hangul Jamo Extended-A
      (0xa960 <= codePoint && codePoint <= 0xa97c) ||
      // Hangul Syllables
      (0xac00 <= codePoint && codePoint <= 0xd7a3) ||
      // CJK Compatibility Ideographs
      (0xf900 <= codePoint && codePoint <= 0xfaff) ||
      // Vertical Forms
      (0xfe10 <= codePoint && codePoint <= 0xfe19) ||
      // CJK Compatibility Forms .. Small Form Variants
      (0xfe30 <= codePoint && codePoint <= 0xfe6b) ||
      // Halfwidth and Fullwidth Forms
      (0xff01 <= codePoint && codePoint <= 0xff60) ||
      (0xffe0 <= codePoint && codePoint <= 0xffe6) ||
      // Kana Supplement
      (0x1b000 <= codePoint && codePoint <= 0x1b001) ||
      // Enclosed Ideographic Supplement
      (0x1f200 <= codePoint && codePoint <= 0x1f251) ||
      // CJK Unified Ideographs Extension B .. Tertiary Ideographic Plane
      (0x20000 <= codePoint && codePoint <= 0x3fffd))
  );
}

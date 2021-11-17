/* 裁剪前导 ! */
Minimatch.prototype.parseNegate = parseNegate;
function parseNegate() {
  var pattern = this.pattern;
  var negate = false;
  var options = this.options;
  var negateOffset = 0;

  // 压制前导 !
  if (options.nonegate) return;

  // 记录 negate 个数
  for (var i = 0, l = pattern.length; i < l && pattern.charAt(i) === '!'; i++) {
    negate = !negate;
    negateOffset++;
  }

  // 裁剪 pattern 前导 !
  if (negateOffset) this.pattern = pattern.substr(negateOffset);
  this.negate = negate;
}

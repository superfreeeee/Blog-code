/* arguments => [...args]，有点过时了这个 */
function slice(args) {
  var length = args.length;
  var array = [];

  for (var i = 0; i < length; i++) array[i] = args[i];
  return array;
}

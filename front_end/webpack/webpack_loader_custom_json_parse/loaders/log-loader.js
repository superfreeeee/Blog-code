const { writeFileSync } = require('fs');
const path = require('path');

let count = 0;

module.exports = function (source) {
  const { id, tag } = this.getOptions();

  console.log(`options: { id: ${id}, tag: ${tag} }`);

  writeFileSync(
    path.join('.', `tmp/${id || ++count}.js`),
    `/* ${tag} */\n` + source
  );
  return source;
};

const inquirer = require('inquirer')

inquirer
  .prompt([
    {
      type: 'input',
      name: 'ans1',
      message: 'question1:',
      default: 'default ans1',
    },
    {
      type: 'list',
      name: 'ans2',
      message: 'question2(list)',
      choices: [
        '0',
        1,
        { name: 'options2', value: 2 },
        { name: 'option3', value: 3, short: 'op4' },
      ],
    },
    {
      type: 'rawlist',
      name: 'ans3',
      message: 'question3(rawlist)',
      choices: Array(5)
        .fill(0)
        .map((_, idx) => ({
          name: `op${idx}`,
          value: idx,
        })),
    },
    {
      type: 'confirm',
      name: 'ans4',
      message: 'question4(confirm)',
    },
    {
      type: 'expand',
      name: 'ans5',
      message: 'question5(expand)',
      choices: [
        { name: 'op0', value: 0, key: 'a' },
        { name: 'op1', value: 1, key: 'b' },
        { name: 'op2', value: 2, key: 'c' },
        { name: 'op3', value: 3, key: 'd' },
      ],
    },
    {
      type: 'checkbox',
      name: 'ans6',
      message: 'question6(checkbox)',
      choices: Array(5)
        .fill(0)
        .map((_, idx) => ({
          name: `op${idx}`,
          value: idx,
        })),
    },
    {
      type: 'password',
      name: 'ans7',
      message: 'question7(password)',
    },
  ])
  .then((answers) => {
    console.log('answers', answers)
  })

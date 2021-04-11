const { test, expect } = require('@jest/globals')
// const { encode, decode, isBase64 } = require('../src/base64')
const base64 = require('../src/base64')

const tests = {
  encode: [
    { s: '123', res: 'MTIz' },
    { s: '123456', res: 'MTIzNDU2' },
    { s: '123\\n456', res: 'MTIzXG40NTY=' },
    { s: '123\n456', res: 'MTIzCjQ1Ng==' },
    {
      s:
        '2345678ijhgfdsq234567ikjhgdsw4567uikjn\nbde567uikjnbfdr6uiolkmnbvdsw4567890plkf\nrtiop[][-098uytrew3456yujkl;[][-098ytrewsdfgh',
      res:
        'MjM0NTY3OGlqaGdmZHNxMjM0NTY3aWtqaGdkc3c0NTY3dWlram4KYmRlNTY3dWlram5iZmRyNnVpb2xrbW5idmRzdzQ1Njc4OTBwbGtmCnJ0aW9wW11bLTA5OHV5dHJldzM0NTZ5dWprbDtbXVstMDk4eXRyZXdzZGZnaA==',
    },
  ],
  isBase64: [
    { s: 'MTIz', res: true },
    { s: 'MTIzNDU2', res: true },
    { s: 'MTIzCjQ1Ng==', res: true },
    { s: '', res: true },
    {
      s:
        'MWU1Njc4aW9sa2poZ2ZkZXJ1aWtuYnZmZHI2dWlramhnZmRlMzQ1cmV3YXp4Y3Zibm1sb2l1NzY1cmVzZGN2Ym5qawp5dWlrbmJ2Y3hzd2VydHl1aW9rbmJ2Y2RzZXJ0eXVpb2xrbW5idmZkZXJ0eXVpa21uYnZmZHI=',
      res: true,
    },
    { s: 'MTIz??', res: false },
    { s: '???MTIz', res: false },
    { s: 'MTIz!!%^())*&*^%$#@@@', res: false },
    {
      s:
        'MWU1Njc4aW9sa2poZ2ZkZXJ1aWtuYnZmZHI2dWlramhnZmRlMzQ1cmV3YXp4Y3Zibm1sb2l1NzY1cmVzZGN2Ym5qawp5dWlrbmJ2Y3hzd2VydHl1aW9rbmJ2Y2RzZXJ0eXVpb2xrbW5idmZkZXJ0eXVpa21uYnZmZHI!',
      res: false,
    },
  ],
}

Reflect.ownKeys(tests).forEach((name) => {
  tests[name].forEach(({ s, res }, index) => {
    test(`test ${name} ${index + 1}`, () => {
      expect(base64[name](s)).toBe(res)
    })
  })
})

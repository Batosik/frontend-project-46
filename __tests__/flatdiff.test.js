import genDiff from "../flatdiff";

const obj1 = {
  "host": "hexlet.io",
  "timeout": 50,
  "proxy": "123.234.53.22",
  "follow": false
}
const obj2 = {
  "timeout": 20,
  "verbose": true,
  "host": "hexlet.io"
}

const expected = 
`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`

test('gendiff', () => {
  expect(genDiff(obj1, obj2)).toBe(expected);
})
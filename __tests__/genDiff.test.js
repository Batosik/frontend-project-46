import genDiff from '../genDiff.js';

const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

test('flatdiff_json', () => {
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json')).toBe(expected);
});

test('flatdiff_yml', () => {
  expect(genDiff('__fixtures__/file1.yml', '__fixtures__/file2.yml')).toBe(expected);
});

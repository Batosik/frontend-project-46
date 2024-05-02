import cp from 'child_process'

// add tests fullpath relpath

test('flatdiff', () => {
  const expected = 
`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`
  const data = cp.execSync(`gendiff __fixtures__/file1.json __fixtures__/file2.json`, { encoding: 'utf-8' });
  expect(data.trim()).toBe(expected);
})

import cp from 'child_process'

test('flatdiff', () => {
  const data = cp.execSync(`node gendiff /Users/batos/frontend-project-46/__fixtures__/file1.json`, { encoding: 'utf-8' });
  expect(data.trim()).toBe(`${first}${connector}${second}`);
})
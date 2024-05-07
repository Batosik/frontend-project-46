import genDiff from '../genDiff.js';
import stylish from '../src/formaters/stylish.js';

const expected = 
`{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

test('flatdiff_json', () => {
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'stylish')).toBe(expected);
});

test('flatdiff_yml', () => {
  expect(genDiff('__fixtures__/file1.yml', '__fixtures__/file2.yml', stylish)).toBe(expected);
});

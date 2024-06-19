import genDiff from '../src/index.js';
// tests

const expected1 = `{
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

const expected2 = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

const expected3 = '[{"type":"nested","key":"common","value":[{"type":"add","key":"follow","value":false},{"type":"equal","key":"setting1","value":"Value 1"},{"type":"removed","key":"setting2","value":200},{"type":"changed","key":"setting3","oldValue":true,"value":null},{"type":"add","key":"setting4","value":"blah blah"},{"type":"add","key":"setting5","value":{"key5":"value5"}},{"type":"nested","key":"setting6","value":[{"type":"nested","key":"doge","value":[{"type":"changed","key":"wow","oldValue":"","value":"so much"}]},{"type":"equal","key":"key","value":"value"},{"type":"add","key":"ops","value":"vops"}]}]},{"type":"nested","key":"group1","value":[{"type":"changed","key":"baz","oldValue":"bas","value":"bars"},{"type":"equal","key":"foo","value":"bar"},{"type":"changed","key":"nest","oldValue":{"key":"value"},"value":"str"}]},{"type":"removed","key":"group2","value":{"abc":12345,"deep":{"id":45}}},{"type":"add","key":"group3","value":{"deep":{"id":{"number":45}},"fee":100500}}]';

test('Compare jsonfiles in stylish format', () => {
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'stylish')).toBe(expected1);
});

test('Compare ymlfiles in stylish format', () => {
  expect(genDiff('__fixtures__/file1.yml', '__fixtures__/file2.yml', 'stylish')).toBe(expected1);
});

test('Compare ymlfiles in plain format', () => {
  expect(genDiff('__fixtures__/file1.yml', '__fixtures__/file2.yml', 'plain')).toBe(expected2);
});

test('Compare jsonfiles in plain format', () => {
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'plain')).toBe(expected2);
});

test('Compare JSONfiles in json format', () => {
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'json')).toBe(expected3);
});

test('Compare YMLfiles in json format', () => {
  expect(genDiff('__fixtures__/file1.yml', '__fixtures__/file2.yml', 'json')).toBe(expected3);
});

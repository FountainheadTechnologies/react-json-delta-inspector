import { Diff } from '@warrenseymour/json-delta';

import { expandPaths } from './expandPaths';

describe('expandPaths', () => {
  it('returns an array of changed paths in json path notation', () => {
    const diff: Diff = [
      ['deleted', 'path'],
      [['some', 'changed', 'path'], 'newValue']
    ];

    expect(expandPaths(diff)).toEqual([
      '$',
      '$.deleted',
      '$.some',
      '$.some.changed'
    ]);
  });
});

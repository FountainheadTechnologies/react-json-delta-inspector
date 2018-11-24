import { diff, Diff } from '@warrenseymour/json-delta';

import { makeRenderedObject } from './renderedObject';
import { AddedValue, ChangedValue, DeletedValue } from './Value';

describe('makeRenderedObject', () => {
  it('creates container objects at changed paths', () => {
    const prev = {
      changedString: 'old',
      unChangedString: 'same',
      deletedBoolean: true,
      deep: {
        deep: {
          deletedBoolean: true,
          unChangedString: 'same'
        }
      }
    };

    const next = {
      changedString: 'new',
      unChangedString: 'same',
      addedNumber: 12,
      deep: {
        deep: {
          unChangedString: 'same'
        }
      }
    };

    const delta = diff(prev, next);

    expect(makeRenderedObject(prev, delta as Diff)).toEqual({
      addedNumber: new AddedValue(12),
      changedString: new ChangedValue('old', 'new'),
      deletedBoolean: new DeletedValue(true),
      deep: {
        deep: {
          deletedBoolean: new DeletedValue(true)
        }
      },
    });
  });
});

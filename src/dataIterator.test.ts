import { dataIterator } from './dataIterator';
import { AddedValue, ChangedValue, DeletedValue } from './Value';

describe('dataIterator', () => {
  it('yields once for `DeletedValue` containers', () => {
    const iterator = dataIterator({
      deletedValue: new DeletedValue('byebye')
    });

    expect(iterator.next().value).toEqual({
      data: 'byebye',
      diff: 'deleted',
      key: 'deletedValue__deleted',
      name: 'deletedValue'
    });

    expect(iterator.next().done).toBe(true);
  });

  it('yields once for `AddedValue` containers', () => {
    const iterator = dataIterator({
      addedValue: new AddedValue('hello')
    });

    expect(iterator.next().value).toEqual({
      data: 'hello',
      diff: 'added',
      key: 'addedValue__added',
      name: 'addedValue'
    });

    expect(iterator.next().done).toBe(true);
  });

  it('yields twice for `ChangedValue` containers', () => {
    const iterator = dataIterator({
      changedValue: new ChangedValue('old', 'new')
    });

    expect(iterator.next().value).toEqual({
      data: 'old',
      diff: 'deleted',
      key: 'changedValue__deleted',
      name: 'changedValue'
    });

    expect(iterator.next().value).toEqual({
      data: 'new',
      diff: 'added',
      key: 'changedValue__added',
      name: 'changedValue'
    });

    expect(iterator.next().done).toBe(true);
  });

  it('yields once for any other value', () => {
    const iterator = dataIterator({
      plainValue: 'test'
    });

    expect(iterator.next().value).toEqual({
      data: 'test',
      name: 'plainValue'
    });
  });
});

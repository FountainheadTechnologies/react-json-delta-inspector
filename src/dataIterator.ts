import { AddedValue, ChangedValue, DeletedValue } from './Value';

/**
 * This is a simplified version of the `dataIterator` that ships with
 * `react-inspector`. It is simplified in that it doesn't support options like
 * the original. It also differs in that it delegates to the accompanying
 * `valueIterator`, in order to yield additional key/value pairs if a value
 * encountered is one of the 'diff container' instances.
 */
export function* dataIterator(data: any) {
  const shouldIterate = (typeof data === 'object' && data !== null) || typeof data === 'function';
  if (!shouldIterate) {
    return;
  }

  // iterable objects (except arrays)
  if (!Array.isArray(data) && data[Symbol.iterator]) {
    let i = 0;
    for (const entry of data) {
      let name = i.toString();
      let value = entry;

      if (Array.isArray(entry) && entry.length === 2) {
        [name, value] = entry;
      }

      yield* valueIterator(name, value);

      i++;
    }
  } else {
    const keys = Object.getOwnPropertyNames(data);

    for (const propertyName of keys) {
      if (data.propertyIsEnumerable(propertyName)) {
        const propertyValue = data[propertyName];

        yield* valueIterator(propertyName, propertyValue);
      }
    }
  }
}

/**
 * Where as the `dataIterator` in `react-inspector` yields a single key-value
 * pair for each item in an iterable object, this version can potentially emit
 * multiple pairs if an item is a `ChangedValue` container (one for the
 * deletion, one for the addition.)
 *
 * A `diff` property is also present in the yielded object, which is passed to
 * the rendered node by `react-inspector`, to vary styling based on the type of
 * change.
 */
export function* valueIterator(name: string = '', value: any) {
  if (value instanceof DeletedValue) {
    yield {
      name,
      key: `${name}__deleted`,
      data: value.prevVal,
      diff: 'deleted'
    };
  } else if (value instanceof ChangedValue) {
    yield {
      name,
      key: `${name}__deleted`,
      data: value.prevVal,
      diff: 'deleted'
    };

    yield {
      name,
      key: `${name}__added`,
      data: value.newVal,
      diff: 'added'
    };
  } else if (value instanceof AddedValue) {
    yield {
      name,
      key: `${name}__added`,
      data: value.val,
      diff: 'added'
    };
  } else {
    yield {
      name,
      data: value
    };
  }
}

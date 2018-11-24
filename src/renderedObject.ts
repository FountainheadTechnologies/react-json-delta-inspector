import { Diff, DiffPart, ObjPath } from '@warrenseymour/json-delta';
import { assocPath, path } from 'ramda';

import { hasPath } from './util';
import { AddedValue, ChangedValue, DeletedValue } from './Value';

/**
 * Creates an 'intermediate' object that will be the object passed to the
 * `TreeView` component. This object contains a mixture of values from both the
 * 'previous' and 'next' objects, depending on how they changed. In addition,
 * each changed value is wrapped in of the 'container' classes, so that the
 * `dataIterator` function can construct the rendered tree appropriately.
 */
export const makeRenderedObject = (prev: any, delta: Diff) =>
  delta.reduce((renderedObject, diffPart) => {
    /**
     * Diff part deleted a value; create a `DeletedValue` container at this
     * path.
     */
    if (isDiffDeletePath(diffPart)) {
      return assocPath(
        diffPart,
        new DeletedValue(path(diffPart, prev)),
        renderedObject
      );
    }

    const [insertPath, insertVal] = diffPart;

    /**
     * Determine if this was an 'add' or 'change' operation based on the
     * presence of a value at this path on the previous object
     */
    const value = hasPath(insertPath, prev) ?
      new ChangedValue(path(insertPath, prev), insertVal) :
      new AddedValue(insertVal);

    return assocPath(
      insertPath,
      value,
      renderedObject
    );
  }, {});

export const isDiffDeletePath = (diffPart: DiffPart): diffPart is ObjPath =>
  !(diffPart[0] instanceof Array);

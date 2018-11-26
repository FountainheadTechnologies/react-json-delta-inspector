import { DiffPart } from '@warrenseymour/json-delta';
import { chain, init, last, pipe, uniq } from 'ramda';

const parentPaths = (path: Array<string | number>) =>
  init(path)
    .reduce((result, segment) => [
      ...result,
      `${last(result)}.${segment}`
    ], ['$']);

export const expandPaths = pipe(
  chain<DiffPart, string>((part: DiffPart) => parentPaths(
    part[0] instanceof Array ?
      part[0] :
      part
  )),

  uniq
);

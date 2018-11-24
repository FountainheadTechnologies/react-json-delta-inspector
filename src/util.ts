import { has, is, tail } from 'ramda';

export const hasPath = (path: Array<string | number>, data: any): boolean => {
  const key = path[0];

  if (!(has as (key: string | number, data: any) => boolean)(key, data)) {
    return false;
  }

  const value = data[key];
  if (is(Object, value)) {
    return path.length === 1 || hasPath(tail(path), value);
  }

  return true;
};

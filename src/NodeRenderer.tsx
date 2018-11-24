import * as React from 'react';
import { ObjectLabel } from 'react-inspector';

import { ObjectRootLabel } from './ObjectRootLabel';
import { styles } from './styles';

export type Props = {
  depth: number;
  name?: string;
  data: {};
  diff?: keyof typeof styles;
};

/**
 * A re-implementation of the `react-inspector` nodeRenderer, except that it
 * uses our own version of `ObjectRootLabel`, and wraps `ObjectLabel` in a span
 * that is styled according to the diff operation that occurred to this value,
 * if any.
 */
export const NodeRenderer: React.SFC<Props> = ({ depth, name, data, diff }) =>
  depth === 0 ?
    (
      <ObjectRootLabel name={name} data={data} />
    ) : (
      <span style={diff ? styles[diff] : {}}>
        <ObjectLabel name={name} data={data} isNonenumerable={false} />
      </span>
    );

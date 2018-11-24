import * as React from 'react';
import { ObjectName } from 'react-inspector';

import { ObjectPreview } from './ObjectPreview';

export type Props = {
  name: any;
  data: any;
};

/**
 * A re-implementation of the `ObjectRootLabel` from `react-inspector`, except
 * that is uses our own version of `ObjectPreview`.
 */
export const ObjectRootLabel: React.SFC<Props> = ({ name, data }) => {
  const preview = (
    <ObjectPreview data={data} />
  );

  return typeof name === 'string' ? (
    <span>
      <ObjectName name={name} />
      <span>: </span>
      {preview}
    </span>
  ) : preview;
};

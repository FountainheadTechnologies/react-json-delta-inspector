import * as React from 'react';

import { Diff } from '@warrenseymour/json-delta';
import ThemeProvider from 'react-inspector/lib/styles/ThemeProvider';
import TreeView from 'react-inspector/lib/tree-view/TreeView';

import { dataIterator } from './dataIterator';
import { NodeRenderer } from './NodeRenderer';
import { makeRenderedObject } from './renderedObject';

export type Props = {
  prev: any;
  delta: Diff;
};

export const DeltaInspector: React.SFC<Props> = ({ prev, delta }) => (
  <ThemeProvider theme='chromeLight'>
    <TreeView
      nodeRenderer={NodeRenderer}
      dataIterator={dataIterator}
      data={makeRenderedObject(prev, delta)}
    />
  </ThemeProvider>
);

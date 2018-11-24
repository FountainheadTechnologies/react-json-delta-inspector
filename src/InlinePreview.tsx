import * as React from 'react';
import { ObjectName } from 'react-inspector';
import { ObjectValue } from 'react-inspector';

import { styles } from './styles';
import { AddedValue, ChangedValue, DeletedValue } from './Value';

export type Props = {
  propertyName?: string;
  propertyValue: any;
  ellipsis?: React.ReactNode;
};

export const InlinePreview: React.SFC<Props> = ({ propertyName = '""', propertyValue, ellipsis }) => {
  if (propertyValue instanceof ChangedValue) {
    return (
      <span>
        <span style={styles.deleted}>
          <ObjectName name={propertyName} />
          :&nbsp;
        <ObjectValue object={propertyValue.prevVal} />
        </span>
        <span style={styles.added}>
          <ObjectName name={propertyName} />
          :&nbsp;
        <ObjectValue object={propertyValue.newVal} />
        </span>
        {ellipsis}
      </span>
    );
  }

  let style;
  let object = propertyValue;

  if (propertyValue instanceof AddedValue) {
    style = styles.added;
    object = propertyValue.val;
  } else if (propertyValue instanceof DeletedValue) {
    style = styles.deleted;
    object = propertyValue.prevVal;
  }

  return (
    <span {...{ style }}>
      <ObjectName name={propertyName} />
      :&nbsp;
      <ObjectValue {...{ object }} />
      {ellipsis}
    </span>
  );
};

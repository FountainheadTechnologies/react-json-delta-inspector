import * as React from 'react';
import { ObjectValue } from 'react-inspector';

import { InlinePreview } from './InlinePreview';
import { styles } from './styles';

export type Props = {
  data: any;
  maxProperties?: number;
};

/**
 * A rather shameless copy+paste of the `ObjectPreview` from `react-inspector`,
 * except that it uses `InlinePreview` to show added and deleted elements
 * 'in-line'.
 */
export const ObjectPreview: React.SFC<Props> = ({ data, maxProperties = 5 }) => {
  const object = data;

  if (
    typeof object !== 'object' ||
    object === null ||
    object instanceof Date ||
    object instanceof RegExp
  ) {
    return <ObjectValue object={object} />;
  }

  if (Array.isArray(object)) {
    const elements = intersperse(
      object.map((element, index) => <ObjectValue key={index} object={element} />),
      ', '
    );

    return (
      <span style={styles.preview}>
        [
          {elements}
        ]
      </span>
    );
  } else {
    const propertyNodes = [];
    for (const propertyName in object) {
      const propertyValue = object[propertyName];
      if (object.hasOwnProperty(propertyName)) {
        let ellipsis;
        if (
          propertyNodes.length === maxProperties - 1 &&
          Object.keys(object).length > maxProperties
        ) {
          ellipsis = <span key={'ellipsis'}>…</span>;
        }
        propertyNodes.push(
          <InlinePreview
            key={propertyName}
            {...{ propertyValue, propertyName, ellipsis }}
          />
        );
        if (ellipsis) {
          break;
        }
      }
    }

    return (
      <span style={styles.preview}>
        {`${object.constructor.name} {`}
        {intersperse(propertyNodes, ', ')}
        {'}'}
      </span>
    );
  }
};

const intersperse = (arr: any[], sep: string) =>
  arr.length === 0 ?
    [] :
    arr.slice(1).reduce((xs, x) => [...xs, sep, x], [arr[0]]);

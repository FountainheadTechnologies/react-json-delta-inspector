import * as React from 'react';

import { configure, shallow } from 'enzyme';
import * as EnzymeAdapter from 'enzyme-adapter-react-16';

import { NodeRenderer } from './NodeRenderer';
import { AddedValue, ChangedValue, DeletedValue } from './Value';

configure({ adapter: new EnzymeAdapter() });

const diffObject = {
  deletedString: new DeletedValue('string'),
  addedNumber: new AddedValue(10),
  array: [
    'zero',
    'one',
    new ChangedValue('too', 'two')
  ]
};

describe('NodeRenderer', () => {
  it('renders the root object', () => {
    const wrapper = shallow(
      <NodeRenderer
        depth={0}
        data={diffObject}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('renders each item in the object', () => {
    (Object.keys(diffObject) as Array<keyof typeof diffObject>).forEach(key => {
      const wrapper = shallow(
        <NodeRenderer
          depth={1}
          data={diffObject[key]}
        />
      );

      expect(wrapper).toMatchSnapshot();
    });
  });
});

import React from 'react';
import renderer from 'react-test-renderer';

import TallyBlocks from './TallyBlocks';

it('sets the stroke array correctly', () => {
  const component = renderer.create(
    <TallyBlocks total={11} count={6}>Facebook</TallyBlocks>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

});

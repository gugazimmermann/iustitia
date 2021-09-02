import { render } from '@testing-library/react';

import Title from './Title';

describe('Title', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Title title="AAA" subtitle="BBB" plan="CCC" />);
    expect(baseElement).toBeTruthy();
  });

  it('should have BBB text', () => {
    const { getAllByText } = render(<Title title="AAA" subtitle="BBB" plan="CCC" />);
    expect(getAllByText('BBB')).toBeTruthy();
  });

  it('should have CCC text', () => {
    const { getAllByText } = render(<Title title="AAA" subtitle="BBB" plan="CCC" />);
    expect(getAllByText('CCC')).toBeTruthy();
  });
});

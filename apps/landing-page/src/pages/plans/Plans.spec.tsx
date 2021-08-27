import { render } from '@testing-library/react';

import Plans from './Plans';

describe('Plans', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Plans />);
    expect(baseElement).toBeTruthy();
  });
  it('should have Planos as the title', () => {
    const { getAllByText } = render(<Plans />);
    expect(getAllByText('Planos')).toBeTruthy();
  });
});

import { render } from '@testing-library/react';

import Terms from './Terms';

describe('Terms', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Terms />);
    expect(baseElement).toBeTruthy();
  });
  it('should have Termos as the title', () => {
    const { getAllByText } = render(<Terms />);
    expect(getAllByText('Termos')).toBeTruthy();
  });
});

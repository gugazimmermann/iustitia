import { render } from '@testing-library/react';

import Help from './Help';

describe('Help', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Help />);
    expect(baseElement).toBeTruthy();
  });
  it('should have Ajuda as the title', () => {
    const { getAllByText } = render(<Help />);
    expect(getAllByText('Ajuda')).toBeTruthy();
  });
});

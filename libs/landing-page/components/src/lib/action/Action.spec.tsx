import { render } from '@testing-library/react';

import Action from './Action';

describe('Action', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Action />);
    expect(baseElement).toBeTruthy();
  });

  it('should have Escritório Virtual as the title', () => {
    const { getAllByText } = render(<Action />);
    expect(getAllByText('Escritório Virtual')).toBeTruthy();
  });
});

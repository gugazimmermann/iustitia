import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Pricing from './Pricing';

describe('Pricing', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MemoryRouter><Pricing /></MemoryRouter>);
    expect(baseElement).toBeTruthy();
  });
});

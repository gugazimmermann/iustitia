import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import ProductDetails from './ProductDetails';

describe('ProductDetails', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MemoryRouter><ProductDetails /></MemoryRouter>);
    expect(baseElement).toBeTruthy();
  });
});

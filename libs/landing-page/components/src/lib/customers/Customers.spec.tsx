import { render } from '@testing-library/react';

import Customers from './Customers';

describe('Customers', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Customers />);
    expect(baseElement).toBeTruthy();
  });

  it('should have Alguns Clientes as the title', () => {
    const { getAllByText } = render(<Customers />);
    expect(getAllByText('Alguns Clientes')).toBeTruthy();
  });
});

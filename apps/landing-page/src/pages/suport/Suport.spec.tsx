import { render } from '@testing-library/react';

import Suport from './Suport';

describe('Suport', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Suport />);
    expect(baseElement).toBeTruthy();
  });
  it('should have Suporte as the title', () => {
    const { getAllByText } = render(<Suport />);
    expect(getAllByText('Suporte')).toBeTruthy();
  });
});

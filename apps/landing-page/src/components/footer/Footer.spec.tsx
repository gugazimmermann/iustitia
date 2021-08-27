import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Footer from './Footer';

describe('Footer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MemoryRouter><Footer /></MemoryRouter>);
    expect(baseElement).toBeTruthy();
  });
});

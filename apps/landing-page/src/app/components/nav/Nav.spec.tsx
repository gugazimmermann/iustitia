import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Nav from './Nav';

describe('Nav', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MemoryRouter><Nav /></MemoryRouter>);
    expect(baseElement).toBeTruthy();
  });
});

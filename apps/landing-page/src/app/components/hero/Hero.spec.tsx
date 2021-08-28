import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Hero from './Hero';

describe('Hero', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MemoryRouter><Hero /></MemoryRouter>);
    expect(baseElement).toBeTruthy();
  });
});

import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Link from './Link';

describe('Link', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MemoryRouter><Link link="/" text="AAA" /></MemoryRouter>);
    expect(baseElement).toBeTruthy();
  });
});

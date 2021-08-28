import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import AuthLink from './AuthLink';

describe('AuthLink', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MemoryRouter><AuthLink link="/" text="AAA" /></MemoryRouter>);
    expect(baseElement).toBeTruthy();
  });
});

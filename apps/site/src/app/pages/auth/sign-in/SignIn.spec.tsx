import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import SignIn from './SignIn';

describe('SignIn', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MemoryRouter><SignIn /></MemoryRouter>);
    expect(baseElement).toBeTruthy();
  });

  it('should have Entre em seu escritório as the title', () => {
    const { getByText } = render(<MemoryRouter><SignIn /></MemoryRouter>);
    expect(getByText('Entre em seu escritório')).toBeTruthy();
  });
});

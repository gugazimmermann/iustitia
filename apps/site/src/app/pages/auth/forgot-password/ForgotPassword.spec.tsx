import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import ForgotPassword from './ForgotPassword';

describe('ForgotPassword', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MemoryRouter><ForgotPassword /></MemoryRouter>);
    expect(baseElement).toBeTruthy();
  });
  it('should have Esqueceu a Senha? as the title', () => {
    const { getByText } = render(<MemoryRouter><ForgotPassword /></MemoryRouter>);
    expect(getByText('Esqueceu a Senha?')).toBeTruthy();
  });
});

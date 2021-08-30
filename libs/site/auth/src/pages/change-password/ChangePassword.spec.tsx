import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import ChangePassword from './ChangePassword';

describe('ChangePassword', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MemoryRouter><ChangePassword /></MemoryRouter>);
    expect(baseElement).toBeTruthy();
  });
  it('should have Mudar Senha as the title', () => {
    const { getByText } = render(<MemoryRouter><ChangePassword /></MemoryRouter>);
    expect(getByText('Mudar Senha')).toBeTruthy();
  });
});

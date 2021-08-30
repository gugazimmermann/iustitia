import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import SignUp from './SignUp';

describe('SignUp', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );
    expect(baseElement).toBeTruthy();
  });
  it('should have Cadastro as the title', () => {
    const { getByText } = render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );
    expect(getByText('Cadastro')).toBeTruthy();
  });
});

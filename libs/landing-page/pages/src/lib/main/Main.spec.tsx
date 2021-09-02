import { render } from '@testing-library/react';

import Main from './Main';

describe('Main', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Main />);
    expect(baseElement).toBeTruthy();
  });

  it('should have Mensagem para vender o Produto! text', () => {
    const { getAllByText } = render(<Main />);
    expect(getAllByText('Mensagem para vender o Produto!')).toBeTruthy();
  });

  it('should have Alguns Clientes text', () => {
    const { getAllByText } = render(<Main />);
    expect(getAllByText('Alguns Clientes')).toBeTruthy();
  });

  it('should have Seu Escritório Virtual text', () => {
    const { getAllByText } = render(<Main />);
    expect(getAllByText('Seu Escritório Virtual')).toBeTruthy();
  });

  it('should have Módulos text', () => {
    const { getAllByText } = render(<Main />);
    expect(getAllByText('Módulos')).toBeTruthy();
  });

  it('should have Planos text', () => {
    const { getAllByText } = render(<Main />);
    expect(getAllByText('Planos')).toBeTruthy();
  });

  it('should have Escritório Virtual text', () => {
    const { getAllByText } = render(<Main />);
    expect(getAllByText('Escritório Virtual')).toBeTruthy();
  });
});

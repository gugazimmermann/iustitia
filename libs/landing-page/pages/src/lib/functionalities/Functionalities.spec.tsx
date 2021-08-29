import { render } from '@testing-library/react';

import Functionalities from './Functionalities';

describe('Functionalities', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Functionalities />);
    expect(baseElement).toBeTruthy();
  });
  it('should have Seu Escritório Virtual as the title', () => {
    const { getAllByText } = render(<Functionalities />);
    expect(getAllByText('Seu Escritório Virtual')).toBeTruthy();
  });
});

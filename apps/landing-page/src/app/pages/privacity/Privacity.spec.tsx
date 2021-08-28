import { render } from '@testing-library/react';

import Privacity from './Privacity';

describe('Privacity', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Privacity />);
    expect(baseElement).toBeTruthy();
  });
  it('should have Privacidade as the title', () => {
    const { getAllByText } = render(<Privacity />);
    expect(getAllByText('Privacidade')).toBeTruthy();
  });
});

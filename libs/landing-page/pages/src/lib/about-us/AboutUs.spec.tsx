import { render } from '@testing-library/react';

import AboutUs from './AboutUs';

describe('AboutUs', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AboutUs />);
    expect(baseElement).toBeTruthy();
  });

  it('should have Sobre Nós as the title', () => {
    const { getAllByText } = render(<AboutUs />);
    expect(getAllByText('Sobre Nós')).toBeTruthy();
  });
});

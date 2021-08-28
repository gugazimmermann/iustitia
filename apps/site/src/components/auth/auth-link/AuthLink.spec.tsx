import { render } from '@testing-library/react';

import AuthLink from './AuthLink';

describe('AuthLink', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AuthLink />);
    expect(baseElement).toBeTruthy();
  });
});

import { render } from '@testing-library/react';

import Layout from './Layout';
import SignIn from '../sign-in/SignIn';

describe('Layout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Layout><SignIn /></Layout>);
    expect(baseElement).toBeTruthy();
  });
});

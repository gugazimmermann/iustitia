import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Layout from './Layout';
import SignIn from '../sign-in/SignIn';

describe('Layout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MemoryRouter><Layout><SignIn /></Layout></MemoryRouter>);
    expect(baseElement).toBeTruthy();
  });
});

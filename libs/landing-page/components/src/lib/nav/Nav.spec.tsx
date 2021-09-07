/* eslint-disable @typescript-eslint/ban-ts-comment */
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from 'react-router';
import Nav from "./Nav";

describe("Nav", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<MemoryRouter><Nav /></MemoryRouter>);
    expect(baseElement).toBeTruthy();
  });

  it('should have Menu as the title', () => {
    const { getAllByText } = render(<MemoryRouter><Nav /></MemoryRouter>);
    expect(getAllByText('Menu')).toBeTruthy();
  });

  it("should call window.location on click", async () => {
    const appSite = process.env.NX_APP_SITE || '';
    const originalLocation = window.location;
    // @ts-expect-error
    delete window.location;
    // @ts-expect-error
    window.location = Object.assign(new URL("http://test.com"), {
      ancestorOrigins: "",
      assign: jest.fn(),
      reload: jest.fn(),
      replace: jest.fn()
    });
    render(<MemoryRouter><Nav /></MemoryRouter>);
    const btn = screen.getByText("Entrar");
    await waitFor(() => fireEvent.click(btn));
    await waitFor(() => expect(window.location.assign).toHaveBeenCalledWith(appSite));
    window.location = originalLocation;
  });
// TODO: test scroll
});



/* eslint-disable @typescript-eslint/ban-ts-comment */
import { fireEvent, screen, render, waitFor } from "@testing-library/react";

import PricingItemButton from "./PricingItemButton";

describe("PricingItemButton", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<PricingItemButton link="AAA" />);
    expect(baseElement).toBeTruthy();
  });

  it('should have Cadastrar text', () => {
    const { getAllByText } = render(<PricingItemButton link="AAA" />);
    expect(getAllByText('Cadastrar')).toBeTruthy();
  });

  it("should call window.location on click", async () => {
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
    render(<PricingItemButton link="AAA" />);
    const btn = screen.getByText("Cadastrar");
    await waitFor(() => fireEvent.click(btn));
    await waitFor(() => expect(window.location.assign).toHaveBeenCalledWith("AAA"));
    window.location = originalLocation;
  });
});

import { render } from "@testing-library/react";

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
});

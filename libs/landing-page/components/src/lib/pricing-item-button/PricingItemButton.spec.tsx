import { render } from "@testing-library/react";

import PricingItemButton from "./PricingItemButton";

describe("PricingItemButton", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<PricingItemButton />);
    expect(baseElement).toBeTruthy();
  });
});

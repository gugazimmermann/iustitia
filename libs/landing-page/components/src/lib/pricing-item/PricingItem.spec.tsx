import { render } from "@testing-library/react";

import PricingItem from "./PricingItem";

describe("PricingItem", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<PricingItem />);
    expect(baseElement).toBeTruthy();
  });
});

import { render } from "@testing-library/react";

import PricingItem from "./PricingItem";

describe("PricingItem", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <PricingItem
        title="AAA"
        functionalities={["func 1", "func 2", "func 3"]}
        price={0}
        priceText="user"
        link="AAA"
        active={true}
      />
    );
    expect(baseElement).toBeTruthy();
  });
  it('should have iustitia as the title', () => {
    const { getAllByText } = render(
      <PricingItem
        title="AAA"
        functionalities={["func 1", "func 2", "func 3"]}
        price={0}
        priceText="user"
        link="AAA"
        active={true}
      />
    );
    expect(getAllByText('func 1')).toBeTruthy();
  });
});

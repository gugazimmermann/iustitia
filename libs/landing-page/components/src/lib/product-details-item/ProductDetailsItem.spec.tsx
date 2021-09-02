import { render } from "@testing-library/react";

import ProductDetailsItem from "./ProductDetailsItem";

describe("ProductDetailsItem", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <ProductDetailsItem title="AAA" subTitle="BBB" text="CCC" link="/" />
    );
    expect(baseElement).toBeTruthy();
  });

  it('should have CCC text', () => {
    const { getAllByText } = render(
      <ProductDetailsItem title="AAA" subTitle="BBB" text="CCC" link="/" />
    );
    expect(getAllByText('CCC')).toBeTruthy();
  });
});

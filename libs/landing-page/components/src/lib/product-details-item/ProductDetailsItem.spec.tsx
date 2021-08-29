import { render } from "@testing-library/react";

import ProductDetailsItem from "./ProductDetailsItem";

describe("ProductDetailsItem", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<ProductDetailsItem />);
    expect(baseElement).toBeTruthy();
  });
});

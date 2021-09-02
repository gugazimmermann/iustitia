import { render } from "@testing-library/react";

import ProductDetails from "./ProductDetails";

describe("ProductDetails", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<ProductDetails />);
    expect(baseElement).toBeTruthy();
  });

  it('should have Módulos text', () => {
    const { getAllByText } = render(<ProductDetails />);
    expect(getAllByText('Módulos')).toBeTruthy();
  });
});

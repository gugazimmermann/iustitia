import { render } from "@testing-library/react";

import ProductMain from "./ProductMain";

describe("ProductMain", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<ProductMain />);
    expect(baseElement).toBeTruthy();
  });

  it('should have Seu Escritório Virtual text', () => {
    const { getAllByText } = render(<ProductMain />);
    expect(getAllByText('Seu Escritório Virtual')).toBeTruthy();
  });
});

import { render } from "@testing-library/react";

import ProductMain from "./ProductMain";

describe("ProductMain", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<ProductMain />);
    expect(baseElement).toBeTruthy();
  });
});

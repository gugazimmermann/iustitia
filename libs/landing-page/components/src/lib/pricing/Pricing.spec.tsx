import { render } from "@testing-library/react";

import Pricing from "./Pricing";

describe("Pricing", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<Pricing />);
    expect(baseElement).toBeTruthy();
  });
});

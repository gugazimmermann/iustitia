import { render } from "@testing-library/react";

import MenuFooter from "./MenuFooter";

describe("MenuFooter", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<MenuFooter />);
    expect(baseElement).toBeTruthy();
  });
});

import { render } from "@testing-library/react";

import MenuTitle from "./MenuTitle";

describe("MenuTitle", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<MenuTitle />);
    expect(baseElement).toBeTruthy();
  });
});

import { render } from "@testing-library/react";

import NavMenuButton from "./NavMenuButton";

describe("NavMenuButton", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<NavMenuButton />);
    expect(baseElement).toBeTruthy();
  });
});

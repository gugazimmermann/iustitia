import { render } from "@testing-library/react";

import AlertSuccess from "./AlertSuccess";

describe("AlertSuccess", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<AlertSuccess />);
    expect(baseElement).toBeTruthy();
  });
});

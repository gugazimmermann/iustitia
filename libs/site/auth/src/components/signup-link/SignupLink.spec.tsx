import { render } from "@testing-library/react";

import SignupLink from "./SignupLink";

describe("SignupLink", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<SignupLink />);
    expect(baseElement).toBeTruthy();
  });
});

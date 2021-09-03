import { render } from "@testing-library/react";

import NavAvatar from "./NavAvatar";

describe("NavAvatar", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<NavAvatar />);
    expect(baseElement).toBeTruthy();
  });
});

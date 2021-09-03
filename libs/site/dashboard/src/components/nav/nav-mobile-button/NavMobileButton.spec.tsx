import { render } from "@testing-library/react";

import NavMobileButton from "./NavMobileButton";

describe("NavMobileButton", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<NavMobileButton />);
    expect(baseElement).toBeTruthy();
  });
});

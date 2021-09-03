import { render } from "@testing-library/react";

import NavNotification from "./NavNotification";

describe("NavMobileButton", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<NavNotification />);
    expect(baseElement).toBeTruthy();
  });
});

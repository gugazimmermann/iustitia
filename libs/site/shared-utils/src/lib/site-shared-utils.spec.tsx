import { render } from "@testing-library/react";

import SiteSharedUtils from "./site-shared-utils";

describe("SiteSharedUtils", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<SiteSharedUtils />);
    expect(baseElement).toBeTruthy();
  });
});

import { render } from "@testing-library/react";

import SiteAttachments from "./SiteAttachments";

describe("SiteAttachments", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<SiteAttachments />);
    expect(baseElement).toBeTruthy();
  });
});

import { render } from "@testing-library/react";

import SiteMembers from "./SiteMembers";

describe("SiteMembers", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<SiteMembers />);
    expect(baseElement).toBeTruthy();
  });
});

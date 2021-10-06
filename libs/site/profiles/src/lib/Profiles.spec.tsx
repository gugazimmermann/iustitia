import { render } from "@testing-library/react";

import SiteProfiles from "./Profiles";

describe("SiteProfiles", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<SiteProfiles />);
    expect(baseElement).toBeTruthy();
  });
});

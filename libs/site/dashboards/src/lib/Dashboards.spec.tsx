import { render } from "@testing-library/react";

import SiteDashboards from "./SiteDashboards";

describe("SiteDashboards", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<SiteDashboards />);
    expect(baseElement).toBeTruthy();
  });
});

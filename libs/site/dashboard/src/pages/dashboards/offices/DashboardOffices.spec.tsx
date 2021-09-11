import { render } from "@testing-library/react";

import DashboardOffices from "./DashboardOffices";

describe("DashboardOffices", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<DashboardOffices />);
    expect(baseElement).toBeTruthy();
  });
});

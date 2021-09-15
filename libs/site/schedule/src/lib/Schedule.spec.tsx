import { render } from "@testing-library/react";

import Schedule from "./Schedule";

describe("Schedule", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<Schedule />);
    expect(baseElement).toBeTruthy();
  });
});

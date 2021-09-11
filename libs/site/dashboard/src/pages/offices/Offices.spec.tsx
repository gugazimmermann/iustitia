import { render } from "@testing-library/react";

import Offices from "./Offices";

describe("Offices", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<Offices />);
    expect(baseElement).toBeTruthy();
  });
});

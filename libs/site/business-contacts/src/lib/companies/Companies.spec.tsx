import { render } from "@testing-library/react";

import Companies from "./Companies";

describe("Companies", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<Companies />);
    expect(baseElement).toBeTruthy();
  });
});

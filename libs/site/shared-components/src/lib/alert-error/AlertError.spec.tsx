import { render } from "@testing-library/react";

import AlertError from "./AlertError";

describe("AlertError", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<AlertError />);
    expect(baseElement).toBeTruthy();
  });
});

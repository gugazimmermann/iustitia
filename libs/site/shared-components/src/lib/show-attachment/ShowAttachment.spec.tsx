import { render } from "@testing-library/react";

import Alert from "./ShowAttachment";

describe("Alert", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<Alert />);
    expect(baseElement).toBeTruthy();
  });
});

import { render } from "@testing-library/react";

import Callout from "./Callout";

describe("Callout", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<Callout title="AAAA" />);
    expect(baseElement).toBeTruthy();
  });
});

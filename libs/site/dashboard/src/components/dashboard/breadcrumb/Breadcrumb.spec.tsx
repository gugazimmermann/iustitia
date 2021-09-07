import { render } from "@testing-library/react";

import Breadcrumb from "./Breadcrumb";

describe("Breadcrumb", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<Breadcrumb before={["AAA", "BBB"]} main="CCC" />);
    expect(baseElement).toBeTruthy();
  });
});

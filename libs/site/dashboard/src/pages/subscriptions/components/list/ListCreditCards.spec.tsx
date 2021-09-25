import { render } from "@testing-library/react";

import ListCreditCards from "./ListCreditCards";

describe("ListCreditCards", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<ListCreditCards />);
    expect(baseElement).toBeTruthy();
  });
});

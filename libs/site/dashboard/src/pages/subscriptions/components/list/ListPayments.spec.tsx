import { render } from "@testing-library/react";

import ListPayments from "./ListPayments";

describe("ListPayments", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<ListPayments />);
    expect(baseElement).toBeTruthy();
  });
});

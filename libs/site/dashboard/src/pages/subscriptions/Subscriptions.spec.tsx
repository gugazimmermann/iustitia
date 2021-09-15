import { render } from "@testing-library/react";

import Subscriptions from "./Subscriptions";

describe("Subscriptions", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<Subscriptions />);
    expect(baseElement).toBeTruthy();
  });
});

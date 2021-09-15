import { render } from "@testing-library/react";

import Contacts from "./Contacts";

describe("Contacts", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<Contacts />);
    expect(baseElement).toBeTruthy();
  });
});

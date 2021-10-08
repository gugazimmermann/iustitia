import { render } from "@testing-library/react";

import SiteBusinessContacts from "./BusinessContacts";

describe("BusinessContacts", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<BusinessContacts />);
    expect(baseElement).toBeTruthy();
  });
});

import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import MenuLink from "./MenuLink";

describe("MenuLink", () => {
  it("should render successfully", () => {
    const subitem = {
      name: "BBB",
      link: "/",
    };
    const { baseElement } = render(<MemoryRouter><MenuLink subitem={subitem} /></MemoryRouter>);    expect(baseElement).toBeTruthy();
  });
});

import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import MenuTitle from "./MenuTitle";

describe("MenuTitle", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<MemoryRouter><MenuTitle /></MemoryRouter>);
    expect(baseElement).toBeTruthy();
  });
});

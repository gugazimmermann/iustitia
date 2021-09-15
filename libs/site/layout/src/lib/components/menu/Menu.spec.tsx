import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Menu from "./Menu";

describe("Menu", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<MemoryRouter><Menu /></MemoryRouter>);
    expect(baseElement).toBeTruthy();
  });
});

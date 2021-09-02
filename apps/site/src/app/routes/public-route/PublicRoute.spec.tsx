import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import PublicRoute from "./PublicRoute";

describe("PublicRoute", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<MemoryRouter><PublicRoute /></MemoryRouter>);
    expect(baseElement).toBeTruthy();
  });
});

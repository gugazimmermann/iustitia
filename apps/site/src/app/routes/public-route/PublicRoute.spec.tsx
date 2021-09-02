import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import PublicRoute from "./PublicRoute";
import * as seeAuth from "../see-auth";

describe("PublicRoute", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<MemoryRouter><PublicRoute /></MemoryRouter>);
    expect(baseElement).toBeTruthy();
  });

  it("Should have call seeAuth", () => {
    const spy = jest.spyOn(seeAuth, 'seeAuth').mockImplementation(() => true);
    const { baseElement } = render(<MemoryRouter><PublicRoute /></MemoryRouter>);
    expect(spy).toHaveBeenCalled()
    spy.mockRestore();
  });
});

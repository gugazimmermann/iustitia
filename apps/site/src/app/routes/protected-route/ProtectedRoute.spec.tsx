import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import ProtectedRoute from "./ProtectedRoute";
import * as seeAuth from "../see-auth";

describe("ProtectedRoute", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<MemoryRouter><ProtectedRoute /></MemoryRouter>);
    expect(baseElement).toBeTruthy();
  });

  it("Should have call seeAuth", () => {
    const spy = jest.spyOn(seeAuth, 'seeAuth').mockImplementation(() => true);
    const { baseElement } = render(<MemoryRouter><ProtectedRoute /></MemoryRouter>);
    expect(spy).toHaveBeenCalled()
    spy.mockRestore();
  });
});

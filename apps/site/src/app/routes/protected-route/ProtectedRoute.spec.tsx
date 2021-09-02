import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import ProtectedRoute from "./ProtectedRoute";

describe("ProtectedRoute", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <MemoryRouter>
        <ProtectedRoute />
      </MemoryRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});

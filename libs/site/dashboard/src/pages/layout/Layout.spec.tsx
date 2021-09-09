import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Profile } from "../..";
import Dashboard from "./Layout";

describe("Dashboard", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <MemoryRouter>
        <Dashboard>
          <Profile />
        </Dashboard>
      </MemoryRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});

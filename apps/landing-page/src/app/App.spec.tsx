import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { LandingPageRoutes as Routes } from "@iustitia/react-routes";
import App from "./App";

describe("App", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(baseElement).toBeTruthy();
  });

  it("should have a Iustitia text", () => {
    const { getAllByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(getAllByText("Iustitia")).toBeTruthy();
  });

  it("should have a Sobre Nós text", () => {
    const { getAllByText } = render(
      <MemoryRouter initialEntries={[Routes.AboutUs]}>
        <App />
      </MemoryRouter>
    );
    expect(getAllByText("Sobre Nós")).toBeTruthy();
  });
});

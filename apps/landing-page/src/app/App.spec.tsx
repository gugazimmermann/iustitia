import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { LandingPageRoutes as Routes } from "@iustitia/react-routes";
import App from "./App";

describe("App", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<MemoryRouter><App /></MemoryRouter>);
    expect(baseElement).toBeTruthy();
  });

  it("should have a Iustitia text", () => {
    const { getAllByText } = render(<MemoryRouter> <App /></MemoryRouter>);
    expect(getAllByText("Iustitia")).toBeTruthy();
  });

  it("should have a Sobre Nós text", () => {
    const { getAllByText } = render(<MemoryRouter initialEntries={[Routes.AboutUs]}><App /></MemoryRouter>);
    expect(getAllByText("Sobre Nós")).toBeTruthy();
  });

  it("should have a Welcome to Contact! text", () => {
    const { getAllByText } = render(<MemoryRouter initialEntries={[Routes.Contact]}><App /></MemoryRouter>);
    expect(getAllByText("Welcome to Contact!")).toBeTruthy();
  });

  it("should have a FAQ text", () => {
    const { getAllByText } = render(<MemoryRouter initialEntries={[Routes.Faq]}><App /></MemoryRouter>);
    expect(getAllByText("FAQ")).toBeTruthy();
  });

  it("should have a Seu Escritório Virtual text", () => {
    const { getAllByText } = render(<MemoryRouter initialEntries={[Routes.Functionalities]}><App /></MemoryRouter>);
    expect(getAllByText("Seu Escritório Virtual")).toBeTruthy();
  });

  it("should have a Ajuda text", () => {
    const { getAllByText } = render(<MemoryRouter initialEntries={[Routes.Help]}><App /></MemoryRouter>);
    expect(getAllByText("Ajuda")).toBeTruthy();
  });

  it("should have a Planos text", () => {
    const { getAllByText } = render(<MemoryRouter initialEntries={[Routes.Plans]}><App /></MemoryRouter>);
    expect(getAllByText("Planos")).toBeTruthy();
  });

  it("should have a Privacidade text", () => {
    const { getAllByText } = render(<MemoryRouter initialEntries={[Routes.Privacity]}><App /></MemoryRouter>);
    expect(getAllByText("Privacidade")).toBeTruthy();
  });

  it("should have a Suporte text", () => {
    const { getAllByText } = render(<MemoryRouter initialEntries={[Routes.Suport]}><App /></MemoryRouter>);
    expect(getAllByText("Suporte")).toBeTruthy();
  });

  it("should have a Termos text", () => {
    const { getAllByText } = render(<MemoryRouter initialEntries={[Routes.Terms]}><App /></MemoryRouter>);
    expect(getAllByText("Termos")).toBeTruthy();
  });
});

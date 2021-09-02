import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import * as auth from "../../services/auth";
import ForgotPassword from "./ForgotPassword";

describe("ForgotPassword", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <MemoryRouter>
        <ForgotPassword />
      </MemoryRouter>
    );
    expect(baseElement).toBeTruthy();
  });

  it("should have Esqueceu a Senha? as the title", () => {
    const { getByText } = render(
      <MemoryRouter>
        <ForgotPassword />
      </MemoryRouter>
    );
    expect(getByText("Esqueceu a Senha?")).toBeTruthy();
  });

  it("should change input class on missing field", async () => {
    render(
      <MemoryRouter>
        <ForgotPassword />
      </MemoryRouter>
    );

    const inputNode = screen.getByLabelText("Email");
    expect(
      inputNode.className.split(" ").includes("focus:border-purple-600")
    ).toBe(true);
    const button = screen.getByText("Enviar Código");
    await waitFor(() => fireEvent.click(button));
    expect(inputNode.className.split(" ").includes("border-red-600")).toBe(
      true
    );
  });

  it("should not submit when email are invalid", async () => {
    const forgotpasswordSpy = jest
      .spyOn(auth, "forgotpassword")
      .mockReturnValue(
        Promise.resolve({
          email: "teste@teste.com",
          date: "01/01/2021 18:30:00",
        })
      );
    const { container, getByText } = render(
      <MemoryRouter>
        <ForgotPassword />
      </MemoryRouter>
    );
    const email = container.querySelector('input[id="email"]') as Element;
    await waitFor(() => fireEvent.input(email, { target: { value: "teste" } }));
    const button = getByText("Enviar Código");
    await waitFor(() => fireEvent.click(button));
    await waitFor(() => expect(forgotpasswordSpy).toBeCalledTimes(0));
    await waitFor(() => expect(getByText("Email inválido!")).toBeTruthy());
    forgotpasswordSpy.mockRestore();
  });

  it("should submit", async () => {
    const forgotpasswordSpy = jest
      .spyOn(auth, "forgotpassword")
      .mockReturnValue(
        Promise.resolve({
          email: "teste@teste.com",
          date: "01/01/2021 18:30:00",
        })
      );
    const { container, getByText } = render(
      <MemoryRouter>
        <ForgotPassword />
      </MemoryRouter>
    );
    const email = container.querySelector('input[id="email"]') as Element;
    await waitFor(() => fireEvent.input(email, { target: { value: "teste@test.com" } }));
    const button = getByText("Enviar Código");
    await waitFor(() => fireEvent.click(button));
    await waitFor(() => {
      expect(forgotpasswordSpy).toBeCalled();
      expect(forgotpasswordSpy).toBeCalledWith("teste@test.com");
    });
    forgotpasswordSpy.mockRestore();
  });
});

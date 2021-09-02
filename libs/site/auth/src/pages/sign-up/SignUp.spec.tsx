import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import routeData, { MemoryRouter } from "react-router";
import { AxiosResponse } from "axios";
import * as auth from "../../services/auth";
import SignUp from "./SignUp";

describe("SignUp", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );
    expect(baseElement).toBeTruthy();
  });

  it("should have Cadastro as the title", () => {
    const { getByText } = render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );
    expect(getByText("Cadastro")).toBeTruthy();
  });

  it("should change input class on missing field", async () => {
    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );
    const nome = screen.getByLabelText("Nome");
    expect(nome.className.split(" ").includes("focus:border-purple-600")).toBe(
      true
    );
    const email = screen.getByLabelText("Email");
    expect(nome.className.split(" ").includes("focus:border-purple-600")).toBe(
      true
    );
    const password = screen.getByLabelText("Senha");
    expect(nome.className.split(" ").includes("focus:border-purple-600")).toBe(
      true
    );
    const repeatPassword = screen.getByLabelText("Repita a Senha");
    expect(nome.className.split(" ").includes("focus:border-purple-600")).toBe(
      true
    );
    const button = screen.getByText("Cadastrar");
    await waitFor(() => fireEvent.click(button));
    expect(nome.className.split(" ").includes("border-red-600")).toBe(true);
    expect(email.className.split(" ").includes("border-red-600")).toBe(true);
    expect(password.className.split(" ").includes("border-red-600")).toBe(true);
    expect(repeatPassword.className.split(" ").includes("border-red-600")).toBe(
      true
    );
  });

  it("should param be Gratuito", async () => {
    const useParamsSpy = jest
      .spyOn(routeData, "useParams")
      .mockReturnValue({ planParam: "gratuito" });
    const { getByText } = render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );
    expect(getByText("Gratuito")).toBeTruthy();
  });

  it("should param be Básico", async () => {
    const useParamsSpy = jest
      .spyOn(routeData, "useParams")
      .mockReturnValue({ planParam: "basico" });
    const { getByText } = render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );
    expect(getByText("Básico")).toBeTruthy();
  });

  it("should param be Profissional", async () => {
    const useParamsSpy = jest
      .spyOn(routeData, "useParams")
      .mockReturnValue({ planParam: "profissional" });
    const { getByText } = render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );
    expect(getByText("Profissional")).toBeTruthy();
  });

  it("should not submit when email are invalid", async () => {
    const signupSpy = jest
      .spyOn(auth, "signup")
      .mockReturnValue(Promise.resolve({} as AxiosResponse));
    const { container, getByText } = render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );
    const username = container.querySelector('input[id="username"]') as Element;
    const email = container.querySelector('input[id="email"]') as Element;
    const password = container.querySelector('input[id="password"]') as Element;
    const repeatPassword = container.querySelector(
      'input[id="repeatPassword"]'
    ) as Element;
    await waitFor(() =>
      fireEvent.input(username, { target: { value: "Test" } })
    );
    await waitFor(() => fireEvent.input(email, { target: { value: "teste" } }));
    await waitFor(() =>
      fireEvent.input(password, { target: { value: "123" } })
    );
    await waitFor(() =>
      fireEvent.input(repeatPassword, { target: { value: "123" } })
    );
    const button = getByText("Cadastrar");
    await waitFor(() => fireEvent.click(button));
    await waitFor(() => expect(signupSpy).toBeCalledTimes(0));
    await waitFor(() => expect(getByText("Email inválido!")).toBeTruthy());
    signupSpy.mockRestore();
  });

  it("should not submit when password are not equal", async () => {
    const signupSpy = jest
      .spyOn(auth, "signup")
      .mockReturnValue(Promise.resolve({} as AxiosResponse));
    const { container, getByText } = render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );
    const username = container.querySelector('input[id="username"]') as Element;
    const email = container.querySelector('input[id="email"]') as Element;
    const password = container.querySelector('input[id="password"]') as Element;
    const repeatPassword = container.querySelector(
      'input[id="repeatPassword"]'
    ) as Element;
    await waitFor(() =>
      fireEvent.input(username, { target: { value: "Test" } })
    );
    await waitFor(() =>
      fireEvent.input(email, { target: { value: "teste@teste.com" } })
    );
    await waitFor(() =>
      fireEvent.input(password, { target: { value: "123" } })
    );
    await waitFor(() =>
      fireEvent.input(repeatPassword, { target: { value: "456" } })
    );
    const button = getByText("Cadastrar");
    await waitFor(() => fireEvent.click(button));
    await waitFor(() => expect(signupSpy).toBeCalledTimes(0));
    await waitFor(() =>
      expect(getByText("Senhas são diferentes!")).toBeTruthy()
    );
    signupSpy.mockRestore();
  });

  it("should submit", async () => {
    const signupSpy = jest
      .spyOn(auth, "signup")
      .mockReturnValue(Promise.resolve({} as AxiosResponse));
    const { container, getByText } = render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );
    const username = container.querySelector('input[id="username"]') as Element;
    const email = container.querySelector('input[id="email"]') as Element;
    const password = container.querySelector('input[id="password"]') as Element;
    const repeatPassword = container.querySelector(
      'input[id="repeatPassword"]'
    ) as Element;
    await waitFor(() =>
      fireEvent.input(username, { target: { value: "Test" } })
    );
    await waitFor(() =>
      fireEvent.input(email, { target: { value: "teste@teste.com" } })
    );
    await waitFor(() =>
      fireEvent.input(password, { target: { value: "123" } })
    );
    await waitFor(() =>
      fireEvent.input(repeatPassword, { target: { value: "123" } })
    );
    const button = getByText("Cadastrar");
    await waitFor(() => fireEvent.click(button));
    await waitFor(() => {
      expect(signupSpy).toBeCalled();
      expect(signupSpy).toBeCalledWith({
        username: "Test",
        email: "teste@teste.com",
        password: "123",
        repeatPassword: "123",
      });
    });
    signupSpy.mockRestore();
  });
});

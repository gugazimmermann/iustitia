import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { AxiosResponse } from "axios";
import * as auth from "../../services/auth";
import * as subscription from "../../services/subscription";
import SignUp from "./SignUp";

describe("SignUp", () => {
  const plansArr = [
    {
      id: "2998538b-fa1f-499e-b9b4-00e6de319ac0",
      reason: "Plan 1",
      transactionAmount: "0",
      currencyId: "BRL",
    },
    {
      id: "826f83d7-dd8b-4d0b-b3d5-8a14742dced8",
      reason: "Plan 2",
      transactionAmount: "10",
      currencyId: "BRL",
    },
  ];

  const plans = jest
    .spyOn(subscription, "getPlans")
    .mockReturnValue(Promise.resolve(plansArr));

  const signupSpy = jest
    .spyOn(auth, "signup")
    .mockReturnValue(Promise.resolve({} as AxiosResponse));

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
    expect(nome.className.split(" ").includes("focus:border-primary-600")).toBe(
      true
    );
    const email = screen.getByLabelText("Email");
    expect(
      email.className.split(" ").includes("focus:border-primary-600")
    ).toBe(true);
    const password = screen.getByLabelText("Senha");
    expect(
      password.className.split(" ").includes("focus:border-primary-600")
    ).toBe(true);
    const repeatPassword = screen.getByLabelText("Repita a Senha");
    expect(
      repeatPassword.className.split(" ").includes("focus:border-primary-600")
    ).toBe(true);
    const plan = screen.getByLabelText("Plano de Assinatura");
    expect(plan.className.split(" ").includes("focus:border-primary-600")).toBe(
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
    expect(plan.className.split(" ").includes("border-red-600")).toBe(true);
  });

  it("should not submit when email are invalid", async () => {
    const { container, getByText } = render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );
    const username = container.querySelector('input[id="username"]') as Element;
    const email = container.querySelector('input[id="email"]') as Element;
    const password = container.querySelector('input[id="password"]') as Element;
    const repeatPassword = container.querySelector('input[id="repeatPassword"]') as Element;
    const plan = container.querySelector('select[id="plan"]') as Element;
    await waitFor(() => fireEvent.input(username, { target: { value: "Test" } }));
    await waitFor(() => fireEvent.input(email, { target: { value: "teste" } }));
    await waitFor(() => fireEvent.input(password, { target: { value: "123" } }));
    await waitFor(() => fireEvent.input(repeatPassword, { target: { value: "123" } }));
    await waitFor(() => fireEvent.change(plan, { target: { value: "826f83d7-dd8b-4d0b-b3d5-8a14742dced8" } }));
    const button = getByText("Cadastrar");
    await waitFor(() => fireEvent.click(button));
    await waitFor(() => expect(signupSpy).toBeCalledTimes(0));
    await waitFor(() => expect(getByText("Email inválido!")).toBeTruthy());
  });

  it("should not submit when password are not equal", async () => {
    const { container, getByText } = render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );
    const username = container.querySelector('input[id="username"]') as Element;
    const email = container.querySelector('input[id="email"]') as Element;
    const password = container.querySelector('input[id="password"]') as Element;
    const repeatPassword = container.querySelector('input[id="repeatPassword"]') as Element;
    const plan = container.querySelector('select[id="plan"]') as Element;
    await waitFor(() => fireEvent.input(username, { target: { value: "Test" } }));
    await waitFor(() => fireEvent.input(email, { target: { value: "teste@teste.com" } }));
    await waitFor(() => fireEvent.input(password, { target: { value: "123" } }));
    await waitFor(() => fireEvent.input(repeatPassword, { target: { value: "456" } }));
    await waitFor(() => fireEvent.change(plan, { target: { value: "826f83d7-dd8b-4d0b-b3d5-8a14742dced8" } }));
    const button = getByText("Cadastrar");
    await waitFor(() => fireEvent.click(button));
    await waitFor(() => expect(signupSpy).toBeCalledTimes(0));
    await waitFor(() =>
      expect(getByText("Senhas são diferentes!")).toBeTruthy()
    );
  });

  it("should submit", async () => {
    const { container, getByText } = render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );
    const username = container.querySelector('input[id="username"]') as Element;
    const email = container.querySelector('input[id="email"]') as Element;
    const password = container.querySelector('input[id="password"]') as Element;
    const repeatPassword = container.querySelector('input[id="repeatPassword"]') as Element;
    const plan = container.querySelector('select[id="plan"]') as Element;
    await waitFor(() => fireEvent.input(username, { target: { value: "Test" } }));
    await waitFor(() => fireEvent.input(email, { target: { value: "teste@teste.com" } }));
    await waitFor(() => fireEvent.input(password, { target: { value: "123" } }));
    await waitFor(() => fireEvent.input(repeatPassword, { target: { value: "123" } }));
    await waitFor(() => fireEvent.change(plan, { target: { value: "826f83d7-dd8b-4d0b-b3d5-8a14742dced8" } }));
    const button = getByText("Cadastrar");
    await waitFor(() => fireEvent.click(button));
    await waitFor(() => {
      expect(signupSpy).toBeCalled();
      expect(signupSpy).toBeCalledWith({
        name: "Test",
        email: "teste@teste.com",
        password: "123",
        repeatPassword: "123",
        plan: "826f83d7-dd8b-4d0b-b3d5-8a14742dced8"
      });
    });
  });
});

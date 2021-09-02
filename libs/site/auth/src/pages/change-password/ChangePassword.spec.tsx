import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import routeData, { MemoryRouter } from "react-router";
import { AxiosResponse } from "axios";
import { SiteRoutes as Routes } from "@iustitia/react-routes";
import * as auth from "../../services/auth";
import ChangePassword from "./ChangePassword";

describe("ChangePassword", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <MemoryRouter>
        <ChangePassword />
      </MemoryRouter>
    );
    expect(baseElement).toBeTruthy();
  });

  it("should have Mudar Senha as the title", () => {
    const { getByText } = render(
      <MemoryRouter>
        <ChangePassword />
      </MemoryRouter>
    );
    expect(getByText("Mudar Senha")).toBeTruthy();
  });

  it("should change input class on missing field", async () => {
    render(
      <MemoryRouter>
        <ChangePassword />
      </MemoryRouter>
    );

    const inputNode = screen.getByLabelText("Nova Senha");
    expect(
      inputNode.className.split(" ").includes("focus:border-purple-600")
    ).toBe(true);
    const button = screen.getByText("Alterar Senha");
    await waitFor(() => fireEvent.click(button));
    expect(inputNode.className.split(" ").includes("border-red-600")).toBe(
      true
    );
  });

  it("should have showInfo alert", async () => {
    const mockLocation = {
      pathname: "/",
      key: "",
      search: "",
      hash: "",
      state: {
        email: "test@test.com",
        date: "01/01/2000 01:01:01",
      },
    };
    const useLocationSpy = jest
      .spyOn(routeData, "useLocation")
      .mockReturnValue(mockLocation);
    const { getByText } = render(
      <MemoryRouter>
        <ChangePassword />
      </MemoryRouter>
    );
    expect(useLocationSpy).toHaveBeenCalled();
    expect(getByText("test@test.com")).toBeTruthy();
    useLocationSpy.mockRestore();
  });

  it("should get code from param", async () => {
    const useParamsSpy = jest
      .spyOn(routeData, "useParams")
      .mockReturnValue({ urlcode: "123" });
    const getPasswordCodeSpy = jest
      .spyOn(auth, "getforgotpasswordcode")
      .mockReturnValue(
        Promise.resolve({ data: { code: 123 } } as AxiosResponse)
      );
    render(
      <MemoryRouter
        initialEntries={[{ pathname: `${Routes.ChangePassword}/123` }]}
      >
        <ChangePassword />
      </MemoryRouter>
    );
    expect(getPasswordCodeSpy).toHaveBeenCalled();
    useParamsSpy.mockRestore();
    getPasswordCodeSpy.mockRestore();
  });

  it("should throw error when get code from param", async () => {
    const useParamsSpy = jest
      .spyOn(routeData, "useParams")
      .mockReturnValue({ urlcode: "123" });
    const getPasswordCodeSpy = jest
      .spyOn(auth, "getforgotpasswordcode")
      .mockReturnValue(Promise.reject());
    const { getByText } = render(
      <MemoryRouter
        initialEntries={[{ pathname: `${Routes.ChangePassword}/123` }]}
      >
        <ChangePassword />
      </MemoryRouter>
    );
    await waitFor(() => expect(getPasswordCodeSpy).toHaveBeenCalled());
    await waitFor(() =>
      expect(
        getByText("Não foi possível recuperar o código, verifique seu email.")
      ).toBeTruthy()
    );
    useParamsSpy.mockRestore();
    getPasswordCodeSpy.mockRestore();
  });

  it("should not submit when password are not equal", async () => {
    const changepasswordSpy = jest
      .spyOn(auth, "changepassword")
      .mockReturnValue(
        Promise.resolve({ data: { code: 123 } } as AxiosResponse)
      );
    const { container, getByText } = render(
      <MemoryRouter>
        <ChangePassword />
      </MemoryRouter>
    );
    const code = container.querySelector('input[id="code"]') as Element;
    const newpassword = container.querySelector(
      'input[id="newpassword"]'
    ) as Element;
    const repeatnewpassword = container.querySelector(
      'input[id="repeatnewpassword"]'
    ) as Element;
    await waitFor(() => fireEvent.input(code, { target: { value: "123" } }));
    await waitFor(() =>
      fireEvent.input(newpassword, { target: { value: "456" } })
    );
    await waitFor(() =>
      fireEvent.input(repeatnewpassword, { target: { value: "789" } })
    );
    const button = getByText("Alterar Senha");
    await waitFor(() => fireEvent.click(button));
    await waitFor(() => expect(changepasswordSpy).toBeCalledTimes(0));
    await waitFor(() =>
      expect(getByText("Senhas são diferentes!")).toBeTruthy()
    );
    changepasswordSpy.mockRestore();
  });

  it("should submit", async () => {
    const changepasswordSpy = jest
      .spyOn(auth, "changepassword")
      .mockReturnValue(
        Promise.resolve({ data: { code: 123 } } as AxiosResponse)
      );
    const { container, getByText } = render(
      <MemoryRouter>
        <ChangePassword />
      </MemoryRouter>
    );
    const code = container.querySelector('input[id="code"]') as Element;
    const newpassword = container.querySelector(
      'input[id="newpassword"]'
    ) as Element;
    const repeatnewpassword = container.querySelector(
      'input[id="repeatnewpassword"]'
    ) as Element;
    await waitFor(() => fireEvent.input(code, { target: { value: "123" } }));
    await waitFor(() =>
      fireEvent.input(newpassword, { target: { value: "456" } })
    );
    await waitFor(() =>
      fireEvent.input(repeatnewpassword, { target: { value: "456" } })
    );
    const button = getByText("Alterar Senha");
    await waitFor(() => fireEvent.click(button));
    await waitFor(() => {
      expect(changepasswordSpy).toBeCalled();
      expect(changepasswordSpy).toBeCalledWith("123", "456");
    });
    changepasswordSpy.mockRestore();
  });
});

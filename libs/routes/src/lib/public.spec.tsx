import { render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import PublicRoute from "./public";
import { AuthServices } from "@iustitia/site/services";

const fakeUser = {
  email: "test@test.com",
  createdAt: "2021-01-01 00:00:00",
  updatedAt: "2021-01-01 00:00:00",
};

describe("PublicRoute", () => {
  it("Should have call seeAuth without call login", async () => {
    const spy = jest
      .spyOn(AuthServices, "getMe")
      .mockImplementation(() => Promise.resolve(fakeUser));
    const { baseElement } = render(
      <MemoryRouter>
        <PublicRoute />
      </MemoryRouter>
    );
    await waitFor(() => expect(spy).toBeCalled());
    spy.mockRestore();
  });

  it("Should have call seeAuth and call login", async () => {
    const spy = jest
      .spyOn(AuthServices, "getMe")
      .mockRejectedValue(new Error("teste"));
    const spyLogout = jest
      .spyOn(AuthServices, "logout")
      .mockImplementation(() => Promise.resolve());
    const { baseElement } = render(
      <MemoryRouter>
        <PublicRoute />
      </MemoryRouter>
    );
    await waitFor(() => expect(spy).toBeCalled());
    spy.mockRestore();
  });
});

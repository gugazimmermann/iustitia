import { render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import PublicRoute from "./PublicRoute";
import * as auth from "@iustitia/site/auth";

describe("PublicRoute", () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render successfully", () => {
    const { baseElement } = render(<MemoryRouter><PublicRoute /></MemoryRouter>);
    expect(baseElement).toBeTruthy();
  });

  it("Should call getUser", () => {
    const getUserSpy = jest.spyOn(auth, "getUser").mockImplementation(() => false);
    render(<MemoryRouter><PublicRoute /></MemoryRouter>);
    expect(getUserSpy).toHaveBeenCalledTimes(1);
  });

  it("Should not call getCurrentUser", () => {
    const getUserSpy = jest.spyOn(auth, "getUser").mockImplementation(() => false);
    const getCurrentUserSpy = jest.spyOn(auth, "getCurrentUser").mockImplementation(() => Promise.resolve({}));
    render(<MemoryRouter><PublicRoute /></MemoryRouter>);
    expect(getUserSpy).toHaveBeenCalledTimes(1);
    expect(getCurrentUserSpy).toHaveBeenCalledTimes(0);
  });

  it("Should call getCurrentUser", async () => {
    const getUserSpy = jest.spyOn(auth, "getUser").mockImplementation(() => true);
    const getCurrentUserSpy = jest.spyOn(auth, "getCurrentUser").mockImplementation(() => Promise.resolve({}));
    render(<MemoryRouter><PublicRoute /></MemoryRouter>);
    expect(getUserSpy).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(getCurrentUserSpy).toHaveBeenCalledTimes(1));
  });

});

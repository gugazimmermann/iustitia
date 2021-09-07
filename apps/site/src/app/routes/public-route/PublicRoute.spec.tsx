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

  it("Should not call getMe", () => {
    const getUserSpy = jest.spyOn(auth, "getUser").mockImplementation(() => false);
    const getMeSpy = jest.spyOn(auth, "getMe").mockImplementation(() => Promise.resolve({}));
    render(<MemoryRouter><PublicRoute /></MemoryRouter>);
    expect(getUserSpy).toHaveBeenCalledTimes(1);
    expect(getMeSpy).toHaveBeenCalledTimes(0);
  });

  it("Should call getMe", async () => {
    const getUserSpy = jest.spyOn(auth, "getUser").mockImplementation(() => true);
    const getMeSpy = jest.spyOn(auth, "getMe").mockImplementation(() => Promise.resolve({}));
    render(<MemoryRouter><PublicRoute /></MemoryRouter>);
    expect(getUserSpy).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(getMeSpy).toHaveBeenCalledTimes(1));
  });

});

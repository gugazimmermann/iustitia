import { render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "@iustitia/site/auth";

describe("ProtectedRoute", () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render successfully", () => {
    const { baseElement } = render(<MemoryRouter><ProtectedRoute /></MemoryRouter>);
    expect(baseElement).toBeTruthy();
  });

  it("Should call getUser", () => {
    const getUserSpy = jest.spyOn(auth, "getUser").mockImplementation(() => false);
    render(<MemoryRouter><ProtectedRoute /></MemoryRouter>);
    expect(getUserSpy).toHaveBeenCalledTimes(1);
  });

  it("Should not call getMe", () => {
    const getUserSpy = jest.spyOn(auth, "getUser").mockImplementation(() => false);
    const getMeSpy = jest.spyOn(auth, "getMe").mockImplementation(() => Promise.resolve({}));
    render(<MemoryRouter><ProtectedRoute /></MemoryRouter>);
    expect(getUserSpy).toHaveBeenCalledTimes(1);
    expect(getMeSpy).toHaveBeenCalledTimes(0);
  });

  it("Should call getMe", async () => {
    const getUserSpy = jest.spyOn(auth, "getUser").mockImplementation(() => true);
    const getMeSpy = jest.spyOn(auth, "getMe").mockImplementation(() => Promise.resolve({}));
    render(<MemoryRouter><ProtectedRoute /></MemoryRouter>);
    expect(getUserSpy).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(getMeSpy).toHaveBeenCalledTimes(1));
  });

});

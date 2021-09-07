/* eslint-disable @typescript-eslint/ban-ts-comment */
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Action from "./Action";

describe("Action", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<Action />);
    expect(baseElement).toBeTruthy();
  });

  it("should have Escritório Virtual as the title", () => {
    const { getAllByText } = render(<Action />);
    expect(getAllByText("Escritório Virtual")).toBeTruthy();
  });

  it("should call window.location on click", async () => {
    const appSite = process.env.NX_APP_SITE || '';
    const originalLocation = window.location;
    // @ts-expect-error
    delete window.location;
    // @ts-expect-error
    window.location = Object.assign(new URL("http://test.com"), {
      ancestorOrigins: "",
      assign: jest.fn(),
      reload: jest.fn(),
      replace: jest.fn()
    });
    render(<Action />);
    const btn = screen.getByText("Cadastrar");
    await waitFor(() => fireEvent.click(btn));
    await waitFor(() => expect(window.location.assign).toHaveBeenCalledWith(`${appSite}/cadastrar`));
    window.location = originalLocation;
  });
});

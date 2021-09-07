/* eslint-disable @typescript-eslint/ban-ts-comment */
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Hero from "./Hero";

describe("Hero", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<Hero />);
    expect(baseElement).toBeTruthy();
  });

  it('should have  Mensagem para vender o Produto! as the title', () => {
    const { getAllByText } = render(<Hero />);
    expect(getAllByText('Mensagem para vender o Produto!')).toBeTruthy();
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
    render(<Hero />);
    const btn = screen.getByText("Cadastrar");
    await waitFor(() => fireEvent.click(btn));
    await waitFor(() => expect(window.location.assign).toHaveBeenCalledWith(`${appSite}/cadastrar`));
    window.location = originalLocation;
  });
});

/* eslint-disable @typescript-eslint/ban-ts-comment */
import { fireEvent, render, screen, waitFor  } from "@testing-library/react";

import ProductDetailsItem from "./ProductDetailsItem";

describe("ProductDetailsItem", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <ProductDetailsItem title="AAA" subTitle="BBB" text="CCC" link="/" />
    );
    expect(baseElement).toBeTruthy();
  });

  it('should have CCC text', () => {
    const { getAllByText } = render(
      <ProductDetailsItem title="AAA" subTitle="BBB" text="CCC" link="/" />
    );
    expect(getAllByText('CCC')).toBeTruthy();
  });

  it("should call window.location on click", async () => {
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
    render(<ProductDetailsItem title="AAA" subTitle="BBB" text="CCC" link="/DDD" />);
    const btn = screen.getByText("Testar");
    await waitFor(() => fireEvent.click(btn));
    await waitFor(() => expect(window.location.assign).toHaveBeenCalledWith("/DDD"));
    window.location = originalLocation;
  });
});

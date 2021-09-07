import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import NotFound from "./NotFound";

describe("NotFound", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<MemoryRouter><NotFound /></MemoryRouter>);
    expect(baseElement).toBeTruthy();
  });

  it("should have 404", () => {
    const { getByText } = render(<MemoryRouter><NotFound /></MemoryRouter>);
    expect(getByText("404")).toBeTruthy();
  });
});

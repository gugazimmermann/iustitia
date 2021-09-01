import { render } from "@testing-library/react";
import { MemoryRouter } from 'react-router';
import SignupLink from "./SignupLink";

describe("SignupLink", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<MemoryRouter><SignupLink /></MemoryRouter>);
    expect(baseElement).toBeTruthy();
  });
});

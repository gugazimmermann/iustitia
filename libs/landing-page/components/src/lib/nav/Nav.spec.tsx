import { render } from "@testing-library/react";
import { MemoryRouter } from 'react-router';
import Nav from "./Nav";

describe("Nav", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<MemoryRouter><Nav /></MemoryRouter>);
    expect(baseElement).toBeTruthy();
  });

  it('should have Menu as the title', () => {
    const { getAllByText } = render(<MemoryRouter><Nav /></MemoryRouter>);
    expect(getAllByText('Menu')).toBeTruthy();
  });
});

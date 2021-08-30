import { render } from "@testing-library/react";
import { MemoryRouter } from 'react-router';
import NavItem from "./NavItem";

describe("NavItem", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<MemoryRouter><NavItem link="AAA" text="iustitia" active={false} /></MemoryRouter>);
    expect(baseElement).toBeTruthy();
  });
  it('should have iustitia as the title', () => {
    const { getAllByText } = render(<MemoryRouter><NavItem link="AAA" text="iustitia" active={true} /></MemoryRouter>);
    expect(getAllByText('iustitia')).toBeTruthy();
  });
});

import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import MenuItem from "./MenuItem";

describe("MenuItem", () => {
  it("should render successfully", () => {
    const item = {
      name: "AAA",
      icon: <div />,
      subItems: [
        {
          name: "BBB",
          link: "/",
        },
      ],
    };
    const { baseElement } = render(<MemoryRouter><MenuItem item={item} /></MemoryRouter>);
    expect(baseElement).toBeTruthy();
  });
});

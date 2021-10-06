import { render } from "@testing-library/react";

import SitePlaces from "./SitePlaces";

describe("SitePlaces", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<SitePlaces />);
    expect(baseElement).toBeTruthy();
  });
});

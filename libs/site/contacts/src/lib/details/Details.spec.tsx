import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Details from "./Details";

describe("Details", () => {
  it("should render successfully", () => {
    const data = {
      name: "AAA",
    };
    const { baseElement } = render(
      <MemoryRouter>
        <Details data={data} />
      </MemoryRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});

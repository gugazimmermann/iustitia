import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ShowAttachment from "./ShowAttachment";

describe("ShowAttachment", () => {
  it("should render successfully", () => {
    const att = {
      date: "01/01/2021 00:00",
      name: "AAA",
      link: "http://teste.com",
    };
    const { baseElement } = render(
      <MemoryRouter>
        <ShowAttachment attachment={att} />
      </MemoryRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});

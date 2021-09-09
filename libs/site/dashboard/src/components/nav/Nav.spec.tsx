import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Me } from "../..";

import Nav from "./Nav";

describe("Nav", () => {
  it("should render successfully", () => {
    const me: Me = {
      email: "teste@teste.com",
      createdAt: "01/01/2021 18:30:30",
      updatedAt: "01/01/2021 18:30:30",
      avatar: ""
    }
    const { baseElement } = render(<MemoryRouter><Nav me={me} /></MemoryRouter>);
    expect(baseElement).toBeTruthy();
  });
});

import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Me } from "../../../pages/layout/Layout";

import NavAvatar from "./NavAvatar";

describe("NavAvatar", () => {
  it("should render successfully", () => {
    const me: Me = {
      email: "teste@teste.com",
      createdAt: "01/01/2021 18:30:30",
      updatedAt: "01/01/2021 18:30:30",
    }
    const { baseElement } = render(<MemoryRouter><NavAvatar me={me} /></MemoryRouter>);
    expect(baseElement).toBeTruthy();
  });
});

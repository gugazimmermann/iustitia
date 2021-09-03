import { render } from "@testing-library/react";
import { Me } from "../..";

import Nav from "./Nav";

describe("Nav", () => {
  it("should render successfully", () => {
    const me: Me = {
      username: "teste",
      email: "teste@teste.com",
      createdAt: "01/01/2021 18:30:30",
      updatedAt: "01/01/2021 18:30:30",
      tenant: "d1b29340-65f7-4adc-8f60-ff0900f3a2ad"
    }
    const { baseElement } = render(<Nav me={me} />);
    expect(baseElement).toBeTruthy();
  });
});

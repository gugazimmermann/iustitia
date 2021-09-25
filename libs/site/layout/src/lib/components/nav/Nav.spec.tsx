import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ProfileInterface } from "../../Layout";

import Nav from "./Nav";

describe("Nav", () => {
  it("should render successfully", () => {
    const profile: ProfileInterface = {
      avatar: "AAA",
      name: "BBB",
      email: "CCC",
      phone: "DDD",
      zip: "EEE",
      address: "FFF",
      number: "GGG",
      complement: "HHH",
      neighborhood:  "III",
      city:  "JJJ",
      state: "KKK",
    }
    const { baseElement } = render(<MemoryRouter><Nav profile={profile} /></MemoryRouter>);
    expect(baseElement).toBeTruthy();
  });
});

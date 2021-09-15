import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { IProfile } from "../../../../../../dashboard/src/interfaces";

import NavAvatar from "./NavAvatar";

describe("NavAvatar", () => {
  it("should render successfully", () => {
    const profile: IProfile = {
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
    const { baseElement } = render(<MemoryRouter><NavAvatar profile={profile} /></MemoryRouter>);
    expect(baseElement).toBeTruthy();
  });
});

import { render } from "@testing-library/react";

import FormatAddress from "./FormatAddress";

describe("AleformatAddressrt", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <FormatAddress
        address="AAA"
        number="BBB"
        complement="CCC"
        neighborhood="DDD"
        city="EEE"
        state="FFF"
        zip="GGG"
      />
    );
    expect(baseElement).toBeTruthy();
  });
});

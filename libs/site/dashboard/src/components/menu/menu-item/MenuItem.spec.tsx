import { MENUICONS } from "@iustitia/site/dashboard";
import { render } from "@testing-library/react";

import MenuItem from "./MenuItem";

describe("MenuItem", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<MenuItem item="AAA" icon={MENUICONS.DASHBOARD} subitems={["AAB", "AAC"]} />);
    expect(baseElement).toBeTruthy();
  });
});

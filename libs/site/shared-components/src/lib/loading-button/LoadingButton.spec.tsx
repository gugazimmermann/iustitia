import { render } from "@testing-library/react";

import LoadingButton from "./LoadingButton";

describe("LoadingButton", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<LoadingButton />);
    expect(baseElement).toBeTruthy();
  });
});

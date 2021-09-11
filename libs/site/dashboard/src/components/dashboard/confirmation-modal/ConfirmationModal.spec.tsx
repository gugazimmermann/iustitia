import { render } from "@testing-library/react";

import ConfirmationModal from "./ConfirmationModal";

describe("ConfirmationModal", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<ConfirmationModal />);
    expect(baseElement).toBeTruthy();
  });
});

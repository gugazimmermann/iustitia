import { render} from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Subscription from "./Subscription";

describe("Subscription", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <MemoryRouter>
        <Subscription />
      </MemoryRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});

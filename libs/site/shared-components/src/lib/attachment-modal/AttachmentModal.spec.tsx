import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AttachmentModal from "./AttachmentModal";

describe("AttachmentModal", () => {
  it("should render successfully", () => {
    const att = {
      date: "01/01/2021 00:00",
      name: "AAA",
      link: "http://teste.com",
    };
    const { baseElement } = render(
      <MemoryRouter>
        <AttachmentModal attachment={att} />
      </MemoryRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});

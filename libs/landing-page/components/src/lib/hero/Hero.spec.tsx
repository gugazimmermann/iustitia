import { render } from "@testing-library/react";

import Hero from "./Hero";

describe("Hero", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<Hero />);
    expect(baseElement).toBeTruthy();
  });

  it('should have  Mensagem para vender o Produto! as the title', () => {
    const { getAllByText } = render(<Hero />);
    expect(getAllByText('Mensagem para vender o Produto!')).toBeTruthy();
  });
});

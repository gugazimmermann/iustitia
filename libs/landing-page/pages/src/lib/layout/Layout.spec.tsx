import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Layout from "./Layout";
import Main from "../main/Main";

describe("Layout", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <MemoryRouter>
        <Layout>
          <Main />
        </Layout>
      </MemoryRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});

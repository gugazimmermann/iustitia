import { render} from "@testing-library/react";
import routeData, { MemoryRouter } from "react-router";
import Plan from "./Plan";

describe("Plan", () => {
  it("should render successfully", () => {
    const mockLocation = {
      pathname: "/",
      key: "",
      search: "",
      hash: "",
      state: {
        form: "",
      },
    };
    const useLocationSpy = jest.spyOn(routeData, "useLocation").mockReturnValue(mockLocation);
    const { baseElement } = render(
      <MemoryRouter>
        <Plan />
      </MemoryRouter>
    );
    expect(baseElement).toBeTruthy();
    expect(useLocationSpy).toHaveBeenCalled();
    useLocationSpy.mockRestore();
  });

  it('should have Selecione seu Plano as the title', () => {
    const mockLocation = {
      pathname: "/",
      key: "",
      search: "",
      hash: "",
      state: {
        form: "",
      },
    };
    const useLocationSpy = jest.spyOn(routeData, "useLocation").mockReturnValue(mockLocation);
    const { getByText } = render(<MemoryRouter><Plan /></MemoryRouter>);
    expect(getByText('Selecione seu Plano')).toBeTruthy();
    expect(useLocationSpy).toHaveBeenCalled();
    useLocationSpy.mockRestore();
  });
});

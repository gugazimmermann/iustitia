import { render} from "@testing-library/react";
import routeData, { MemoryRouter } from "react-router";
import Subscription from "./Subscription";

describe("Subscription", () => {
  it("should render successfully", () => {
    const mockLocation = {
      pathname: "/",
      key: "",
      search: "",
      hash: "",
      state: {
        email: "",
        planId: "",
      },
    };
    const useLocationSpy = jest.spyOn(routeData, "useLocation").mockReturnValue(mockLocation);
    const { baseElement } = render(
      <MemoryRouter>
        <Subscription />
      </MemoryRouter>
    );
    expect(baseElement).toBeTruthy();
    expect(useLocationSpy).toHaveBeenCalled();
    useLocationSpy.mockRestore();
  });

  it('should have Assinatura as the title', () => {
    const mockLocation = {
      pathname: "/",
      key: "",
      search: "",
      hash: "",
      state: {
        email: "",
        planId: "",
      },
    };
    const useLocationSpy = jest.spyOn(routeData, "useLocation").mockReturnValue(mockLocation);
    const { getByText } = render(<MemoryRouter><Subscription /></MemoryRouter>);
    expect(getByText('Assinatura')).toBeTruthy();
    expect(useLocationSpy).toHaveBeenCalled();
    useLocationSpy.mockRestore();
  });
});

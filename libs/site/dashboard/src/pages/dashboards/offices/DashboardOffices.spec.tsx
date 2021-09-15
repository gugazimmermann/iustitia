import { render } from "@testing-library/react";
import routeData, { MemoryRouter } from "react-router";
import DashboardOffices from "./DashboardOffices";

describe("DashboardOffices", () => {
  it("should render successfully", () => {
    const mockLocation = {
      pathname: "/",
      key: "",
      search: "",
      hash: "",
      state: {
        id: ""
      },
    };
    const useLocationSpy = jest
    .spyOn(routeData, "useLocation")
    .mockReturnValue(mockLocation);
    const { baseElement } = render(<MemoryRouter><DashboardOffices /></MemoryRouter>);
    expect(baseElement).toBeTruthy();
  });
});

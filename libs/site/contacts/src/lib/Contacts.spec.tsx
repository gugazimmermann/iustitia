import { render, waitFor } from "@testing-library/react";
import routeData, { MemoryRouter } from "react-router";
import * as Services from "./services";
import Contacts from "./Contacts";
import { AxiosResponse } from "axios";
import { ModuleInterface } from "..";

describe("Contacts", () => {
  it("should render successfully", async () => {
    const mockLocation = {
      pathname: "/",
      key: "",
      search: "",
      hash: "",
      state: {
        id: "AAA",
      },
    };
    const useLocationSpy = jest
      .spyOn(routeData, "useLocation")
      .mockReturnValue(mockLocation);
      const getOneSpy = jest
      .spyOn(Services, "getOne")
      .mockReturnValue(
        Promise.resolve({ name: "BBB"} as ModuleInterface)
      );
    const { baseElement } = render(
      <MemoryRouter>
        <Contacts />
      </MemoryRouter>
    );
    expect(baseElement).toBeTruthy();
    await waitFor(() => expect(useLocationSpy).toHaveBeenCalled());
    useLocationSpy.mockRestore();
    getOneSpy.mockRestore();
  });
});

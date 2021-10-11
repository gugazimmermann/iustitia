import{ createContext, useReducer, Dispatch, ReactNode, ReactElement } from "react";
import { StateType, MenuActions, MenuReducer } from "./reducers";

const initialState = { activeMenu: "" };

type MenuContextType = { state: StateType, dispatch: Dispatch<MenuActions> };

const MenuContext = createContext<MenuContextType>({ state: initialState, dispatch: () => null });

const mainReducer = (state: StateType, action: MenuActions) => MenuReducer(state, action);

const MenuProvider = ({ children }: { children: ReactNode }): ReactElement => {
  const [state, dispatch] = useReducer(mainReducer, initialState);
  return <MenuContext.Provider value={{ state, dispatch }}>{children}</MenuContext.Provider>;
};

export { MenuProvider, MenuContext };

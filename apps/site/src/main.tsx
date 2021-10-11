import { StrictMode } from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { MenuProvider } from "@iustitia/site/layout";
import App from "./app/App";
import "./styles.css";

ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <MenuProvider>
        <App />
      </MenuProvider>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById("root")
);

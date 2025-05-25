import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import PasswordGenerator from "./PasswordGenerator";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <PasswordGenerator />
  </StrictMode>
);

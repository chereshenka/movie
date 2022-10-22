import { createRoot } from "react-dom/client";

import App from "./Components/app";
import "./index.css";
const el = <App />;
const container = document.getElementById("root");
const root = createRoot(container);
root.render(el);

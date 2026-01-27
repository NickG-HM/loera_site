import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Service worker is automatically registered by vite-plugin-pwa
// No manual registration needed

createRoot(document.getElementById("root")!).render(<App />);

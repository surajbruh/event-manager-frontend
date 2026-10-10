import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./service/auth/AuthProvider.tsx";
import { EventProvider } from "./service/events/EventProvider.tsx";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <EventProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </EventProvider>
    </BrowserRouter>
  </StrictMode>,
);

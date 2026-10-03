import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./auth/AuthProvider.tsx";
import { EventProvider } from "./events/EventProvider.tsx";
import { BrowserRouter, Routes, Route } from "react-router";
import Header from "./components/Header.tsx";
import Profile from "./pages/Proflie.tsx";
import Protected from "./Protected.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <EventProvider>
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route index element={<App />} />
            <Route element={<Protected />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </EventProvider>
  </StrictMode>,
);

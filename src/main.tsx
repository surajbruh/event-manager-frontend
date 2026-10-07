import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./service/auth/AuthProvider.tsx";
import { EventProvider } from "./service/events/EventProvider.tsx";
import { BrowserRouter, Routes, Route } from "react-router";
import Header from "./components/Header.tsx";
import Profile from "./pages/Proflie.tsx";
import Protected from "./Protected.tsx";
import EventPage from "./pages/Event.tsx";

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
            <Route path="events/:id" element={<EventPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </EventProvider>
  </StrictMode>,
);

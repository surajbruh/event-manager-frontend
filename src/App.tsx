import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import Protected from "./Protected";
import { useEffect } from "react";
import { useAuth } from "./service/auth/useAuth";
import { useEvent } from "./service/events/useEvent";
import Footer from "./components/Footer";
import Header from "./components/Header";
import NotFound from "./pages/NotFound";

export default function App() {
  const { state: auth } = useAuth();
  const { state: eventState } = useEvent();

  useEffect(() => {
    console.log(auth.user);
  }, [auth]);

  useEffect(() => {
    console.log(eventState.events);
  }, [eventState]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route element={<Protected />}>
          {/* <Route path="/profile" element={<Profile />} />
          <Route path="/events/new" element={<EventForm />} /> */}
        </Route>
        {/* <Route path="events/:id" element={<EventPage />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Protected from "./Protected";
import { useEffect } from "react";
import { useAuth } from "./service/auth/useAuth";
import { useEvent } from "./service/events/useEvent";
import Footer from "./components/Footer";
import Header from "./components/Header";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Proflie";
import EventPage from "./pages/Event";
import EventForm from "./pages/EventForm";
import HostEventForm from "./pages/HostEventForm";
import AuthForm from "./pages/AuthFrom";

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
    <>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/auth/register" element={<AuthForm mode={"REGISTER"} />} />
        <Route path="/auth/login" element={<AuthForm mode={"LOGIN"} />} />
        <Route element={<Protected />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/events/new" element={<HostEventForm />} />
          <Route path="/events/:id/edit" element={<EventForm />} />
        </Route>
        <Route path="events/:id" element={<EventPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

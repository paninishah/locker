import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import AdminAuth from "./pages/admin/AdminAuth";
import Dashboard from "./pages/admin/Dashboard";
import EventForm from "./pages/admin/EventForm";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/admin/auth" element={<AdminAuth />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/events/new" element={<EventForm />} />
        <Route path="/admin/events/:id/edit" element={<EventForm />} />
      </Routes>
    </BrowserRouter>
  );
}

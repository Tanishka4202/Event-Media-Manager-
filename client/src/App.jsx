import { Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Events from "./pages/Events";
import Upload from "./pages/Upload";
import Gallery from "./pages/Gallery";
import Landing from "./pages/Landing";
import AIPhotos from "./pages/AIPhotos";
import Dashboard from "./pages/Dashboard";
import EventDetails from "./pages/EventDetails";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {

  return (

    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/events" element={<Events />} />
      <Route path="/upload" element={
    <ProtectedRoute>
      <Upload />
    </ProtectedRoute>
  }
/>
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/" element={<Landing />} />
      <Route path="/ai-photos" element={<AIPhotos />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/event/:id" element={<EventDetails />} />
      <Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/><Route path="/admin" element={<Admin />} />
    </Routes>

  );

}

export default App;
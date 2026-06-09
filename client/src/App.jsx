import { Routes, Route } from "react-router-dom";
import socket from "./socket";
import { useEffect } from "react";
import toast from "react-hot-toast";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Events from "./pages/Events";
import Gallery from "./pages/Gallery";
import Landing from "./pages/Landing";
import AIPhotos from "./pages/AIPhotos";
import Dashboard from "./pages/Dashboard";
import EventDetails from "./pages/EventDetails";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Saved from "./pages/Saved";


function App() {
  useEffect(() => {

  socket.on(

    "receive_notification",

    (data) => {

    toast.success(data.text);

    }

  );

  return () => {

    socket.off(
      "receive_notification"
    );

  };

}, []);

  return (

    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/events" element={<Events />} />
      <Route path="/gallery" element={<Gallery />} />
<Route path="/landing" element={<Landing />} />
      <Route path="/ai-photos" element={<AIPhotos />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route
  path="/event/:id"
  element={<EventDetails />}
/>
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route path="/event/:id" element={<EventDetails />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/saved" element={<Saved />}/>
      </Routes>
      

  );

}

export default App;
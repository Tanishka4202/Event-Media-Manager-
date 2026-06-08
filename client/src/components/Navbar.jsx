import { Link } from "react-router-dom";

import NotificationBell from "./NotificationBell";
const handleLogout = () => {

    localStorage.removeItem("token");

    window.location.href = "/login";

};

const Navbar = () => {

  return (

    <div className="bg-slate-900 text-white p-5 flex justify-between items-center shadow-lg">

      <h1 className="text-3xl font-bold text-green-400">
        EventSphere AI
      </h1>

      <div className="flex gap-6 text-lg items-center">
        <Link to="/admin">
          Admin
        </Link>
        <Link to="/dashboard">
          Dashboard
        </Link>
        <Link to="/events">
          Events
        </Link>

        <Link to="/upload">
          Upload
        </Link>

        <Link to="/gallery">
          Gallery
        </Link>

        <Link to="/ai-photos">
          AI Photos
        </Link>
        <Link to="/profile">
    Profile
</Link>

        <NotificationBell />

      </div>

    </div>

  );

};

export default Navbar;
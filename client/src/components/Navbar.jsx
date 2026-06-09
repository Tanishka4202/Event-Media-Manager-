import { io } from "socket.io-client";
import { useState, useEffect } from "react";

import {

  FaBell,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaHome,
  FaCalendarAlt,
  FaImages,
  FaRobot,
  FaUserCircle, FaBookmark

} from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] =
    useState(false);
  const [showNotifications, setShowNotifications] =
    useState(false);

  const [notifications, setNotifications] =
    useState([
      {
        id: 1,
        text: "Rohan liked your photo ❤️"
      },
      {
        id: 2,
        text: "Ananya commented on your upload 💬"
      }
    ]);

  const socket = io(import.meta.env.VITE_API_URL);
  useEffect(() => {

    socket.on(

      "receive_notification",

      (data) => {

        setNotifications(
          (prev) => [

            data,
            ...prev

          ]
        );

      }

    );

    return () => {

      socket.off(
        "receive_notification"
      );

    };

  }, []);

  const logout = () => {

    localStorage.removeItem("token");

    navigate("/");

  };

  const navLinks = [

    {
      name: "Dashboard",
      icon: <FaHome />,
      path: "/dashboard"
    },

    {
      name: "Events",
      icon: <FaCalendarAlt />,
      path: "/events"
    },

    {
      name: "Gallery",
      icon: <FaImages />,
      path: "/gallery"
    },

    {
      name: "AI Photos",
      icon: <FaRobot />,
      path: "/ai"
    },

    {
      name: "Profile",
      icon: <FaUserCircle />,
      path: "/profile"
    }

  ];

  return (

    <nav className="w-full bg-white/80 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-[85px] flex items-center justify-between">

        {/* LOGO */}

        <h1 className="text-3xl lg:text-2xl font-black bg-gradient-to-r from-[#7B2CBF] to-[#4361EE] bg-clip-text text-transparent">

          EventSphere AI

        </h1>

        {/* DESKTOP MENU */}

        <div className="hidden lg:flex items-center gap-10">

          {navLinks.map((link, index) => (

            <Link

              key={index}

              to={link.path}

              className="flex items-center gap-2 text-[#2d1457] font-semibold hover:text-[#7B2CBF] transition-all"

            >

              {link.icon}

              {link.name}

            </Link>

          ))}

        </div>

        {/* RIGHT */}

        <div className="flex items-center gap-5">

          <div className="relative">
            <button

              onClick={() =>
                navigate("/saved")
              }

              className="text-2xl text-[#7B2CBF] hover:scale-110 transition-all"

            >

              <FaBookmark />

            </button>

            <button

              onClick={() =>
                setShowNotifications(
                  !showNotifications
                )
              }

              className="relative"

            >

              <FaBell className="text-2xl text-[#7B2CBF]" />

              {/* BADGE */}

              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">

                {notifications.length}

              </span>

            </button>

            {/* POPUP */}

            {
              showNotifications && (

                <div className="absolute right-0 mt-4 w-[340px] bg-white rounded-[25px] shadow-2xl border p-5 z-[999]">

                  <h1 className="text-2xl font-black text-[#2d1457] mb-4">

                    Notifications

                  </h1>

                  <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto">

                    {

                      notifications.map((item) => (

                        <div

                          key={item.id}

                          className="bg-[#f8f5ff] rounded-2xl p-4 hover:bg-[#f0e8ff] transition-all"

                        >

                          <p className="text-gray-700">

                            {item.text}

                          </p>

                        </div>

                      ))

                    }

                  </div>

                </div>

              )
            }

          </div>

          {/* LOGOUT */}

          <button

            onClick={logout}

            className="hidden md:flex items-center gap-3 bg-gradient-to-r from-[#7B2CBF] to-[#4361EE] text-white px-5 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all"

          >

            <FaSignOutAlt />

            Logout

          </button>

          {/* HAMBURGER */}

          <button

            onClick={() =>
              setMenuOpen(!menuOpen)
            }

            className="lg:hidden text-3xl text-[#2d1457]"

          >

            {

              menuOpen
                ? <FaTimes />
                : <FaBars />

            }

          </button>

        </div>

      </div>

      {/* MOBILE MENU */}

      {menuOpen && (

        <div className="lg:hidden bg-white border-t border-gray-200 px-6 py-6 flex flex-col gap-6 shadow-xl">

          {navLinks.map((link, index) => (

            <Link

              key={index}

              to={link.path}

              onClick={() =>
                setMenuOpen(false)
              }

              className="flex items-center gap-3 text-[#2d1457] text-base font-semibold"

            >

              {link.icon}

              {link.name}

            </Link>

          ))}

          <button

            onClick={logout}

            className="mt-4 bg-gradient-to-r from-[#7B2CBF] to-[#4361EE] text-white py-4 rounded-2xl font-bold"

          >

            Logout

          </button>

        </div>

      )}

    </nav>

  );

};

export default Navbar;
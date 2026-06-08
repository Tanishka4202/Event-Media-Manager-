import { useEffect, useState } from "react";

import socket from "../socket";

const NotificationBell = () => {

  const [open, setOpen] = useState(false);

  const [notifications, setNotifications] =
    useState([]);

  useEffect(() => {

    socket.on(

      "receive_notification",

      (data) => {

        setNotifications((prev) => [
          data,
          ...prev
        ]);

      }

    );

  }, []);

  return (

    <div className="relative">

      <button
        onClick={() => setOpen(!open)}
        className="text-3xl relative"
      >
        🔔

        {notifications.length > 0 && (

          <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-2 rounded-full">

            {notifications.length}

          </span>

        )}

      </button>

      {open && (

        <div className="absolute right-0 mt-4 bg-slate-900 text-white p-5 rounded-2xl w-[320px] shadow-2xl z-50">

          <h1 className="text-xl font-bold mb-4">
            Notifications
          </h1>

          {notifications.length === 0 && (

            <p className="text-gray-400">
              No notifications
            </p>

          )}

          {notifications.map((n, index) => (

            <div
              key={index}
              className="mb-3 border-b border-slate-700 pb-2"
            >
              {n}
            </div>

          ))}

        </div>

      )}

    </div>

  );

};

export default NotificationBell;
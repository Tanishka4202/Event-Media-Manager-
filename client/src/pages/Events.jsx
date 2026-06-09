import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect } from "react";

import Navbar from "../components/Navbar";

import {

  FaCalendarAlt,

  FaSearch,

  FaPlus,

  FaImages,
  FaTrash

} from "react-icons/fa";

const Events = () => {
  const navigate = useNavigate();
  const [sortType, setSortType] =
    useState("name");

  const [events, setEvents] = useState([]);

  const [showCreate, setShowCreate] =
    useState(false);

  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [visibility, setVisibility] =
    useState("public");
  const [coverImage, setCoverImage] =
    useState("");
  const fetchEvents = async () => {

    try {

      const res = await axios.get(

        `${import.meta.env.VITE_API_URL}/api/events`

      );

      setEvents(res.data);

    }

    catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchEvents();

  }, []);

  const createEvent = async () => {

    try {

      await axios.post(

        `${import.meta.env.VITE_API_URL}/api/events/create`,

        {

          title,
          description,
          category,
          visibility,
          coverImage,

          createdBy: "Tanishka"

        }

      );

      toast.success(
        "Event Created 🚀"
      );

      setShowCreate(false);

      fetchEvents();

    }

    catch (error) {

      console.log(error);

      toast.error(
        "Failed"
      );

    }

  };

  const deleteEvent = async (id) => {

    try {

      await axios.delete(

        `${import.meta.env.VITE_API_URL}/api/events/${id}`

      );

      toast.success(
        "Event Deleted 🗑️"
      );

      fetchEvents();

    }

    catch (error) {

      console.log(error);

      toast.error(
        "Delete Failed"
      );

    }

  };


  return (

    <div className="min-h-screen bg-gradient-to-br from-[#f5f3ff] via-[#faf7ff] to-[#eef2ff]">

      {/* NAVBAR */}

      <Navbar />

      {/* HERO */}

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center max-w-7xl mx-auto px-6 md:px-10 pt-14 gap-8">

        <div>

          <h1 className="text-5xl md:text-6xl font-black text-[#2d1457]">

            Events Dashboard

          </h1>

          <p className="text-gray-500 text-lg md:text-xl mt-4 max-w-2xl leading-relaxed">

            Organize, manage and explore all your club events,
            albums and AI-powered memories in one place.

          </p>

        </div>

        {/* CREATE EVENT */}

        <button className="bg-gradient-to-r from-[#7B2CBF] to-[#4361EE] text-white px-8 py-4 rounded-2xl shadow-xl hover:scale-105 transition-all flex items-center gap-3" onClick={() =>
          setShowCreate(true)
        }>

          <FaPlus />

          Create Event

        </button>

      </div>

      {/* STATS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-6 md:px-10 mt-14">

        <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-8 shadow-lg">

          <h2 className="text-gray-500">

            Total Events

          </h2>

          <h1 className="text-5xl font-black text-[#7B2CBF] mt-3">

            24

          </h1>

        </div>

        <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-8 shadow-lg">

          <h2 className="text-gray-500">

            Media Uploaded

          </h2>

          <h1 className="text-5xl font-black text-[#4361EE] mt-3">

            12K+

          </h1>

        </div>

        <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-8 shadow-lg">

          <h2 className="text-gray-500">

            Active Members

          </h2>

          <h1 className="text-5xl font-black text-pink-500 mt-3">

            540

          </h1>

        </div>

      </div>

      {/* SEARCH + SORT */}

      <div className="flex flex-col md:flex-row gap-6 justify-between items-center max-w-7xl mx-auto px-6 md:px-10 mt-14">

        {/* SEARCH */}

        <div className="bg-white px-6 py-4 rounded-2xl shadow-md outline-none text-black flex items-center gap-4 w-full md:w-[450px]">

          <FaSearch className="text-gray-400" />

          <input
            type="text"
            placeholder="Search events..."
            className="w-full outline-none bg-transparent text-black"
          />

        </div>

        {/* SORT */}

        <select

          value={sortType}

          onChange={(e) =>
            setSortType(
              e.target.value
            )
          }

          className="bg-white px-6 py-4 rounded-2xl shadow-md outline-none w-full md:w-[250px]"

        >

          <option value="name" classname="text-black">

            Sort by Name

          </option>

          <option value="date" classname="text-black">

            Sort by Date

          </option>

          <option value="category" classname="text-black">

            Sort by Category

          </option>

        </select>

      </div>

      {/* EVENTS GRID */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 max-w-7xl mx-auto px-6 md:px-10 py-16">

        {events.map((event) => (

          <div

            key={event.id}

            className="bg-white/80 backdrop-blur-lg rounded-[30px] overflow-hidden shadow-xl hover:scale-[1.03] transition-all duration-300"

          >

            {/* IMAGE */}

            <img
              src={event.coverImage ||
                "https://images.unsplash.com/photo-1492684223066-81342ee5ff30"}
              alt=""
              className="h-[240px] w-full object-cover"
            />

            {/* CONTENT */}

            <div className="p-6">

              {/* TOP */}

              <div className="flex items-start justify-between gap-4">

                <h1 className="text-3xl font-black text-[#2d1457] leading-tight">

                  {event.title}

                </h1>

                <span className="bg-gradient-to-r from-[#7B2CBF] to-[#4361EE] text-white px-4 py-2 rounded-full text-sm shadow-lg whitespace-nowrap">

                  {event.category}

                </span>

              </div>

              {/* DESC */}

              <p className="text-gray-500 mt-4 leading-relaxed line-clamp-3">

                {event.description}

              </p>

              {/* DATE */}

              <div className="flex items-center gap-3 mt-5 text-gray-400 text-sm">

                <FaCalendarAlt />

                Created on {

                  new Date(event.createdAt)

                    .toLocaleDateString()

                }

              </div>

              {/* USER */}

              <div className="flex items-center gap-3 mt-5">

                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#7B2CBF] to-[#4361EE] flex items-center justify-center text-white font-bold">

                  {

                    event.createdBy?.charAt(0)

                  }

                </div>

                <div>

                  <p className="font-semibold text-[#2d1457]">

                    {event.createdBy}

                  </p>

                  <p className="text-xs text-gray-400">

                    Event Organizer

                  </p>

                </div>

              </div>

              {/* BUTTONS */}

              <div className="flex gap-4 mt-7">

                <button

                  onClick={() =>
                    navigate(`/event/${event._id}`)
                  }

                  className="flex-1 bg-gradient-to-r from-[#7B2CBF] to-[#4361EE] text-white py-4 rounded-2xl shadow-lg hover:scale-105 transition-all"

                >

                  View Event

                </button>

                <button

                  onClick={() =>
                    deleteEvent(event._id)
                  }

                  className="w-[65px] bg-red-100 text-red-500 rounded-2xl flex items-center justify-center hover:bg-red-200 transition-all"

                >

                  <FaTrash />

                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

      {

        showCreate && (

          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999]">

            <div className="bg-white rounded-[30px] p-8 w-full max-w-xl shadow-2xl">

              <h1 className="text-4xl font-black text-[#2d1457]">

                Create Event

              </h1>

              <div className="flex flex-col gap-5 mt-8">

                <input
                  type="text"
                  placeholder="Event Title"
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                  className="border p-4 rounded-2xl outline-none text-black placeholder:text-gray-400"
                />

                <textarea
                  placeholder="Description"
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
                  className="border p-4 rounded-2xl outline-none h-[120px] text-black placeholder:text-gray-400"
                />

                <input
                  type="text"
                  placeholder="Category"
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value)
                  }
                  className="border p-4 rounded-2xl outline-none text-black placeholder:text-gray-400"
                />

                <select
                  value={visibility}
                  onChange={(e) =>
                    setVisibility(e.target.value)
                  }
                  className="border p-4 rounded-2xl outline-none text-black placeholder:text-gray-400"
                >

                  <option value="public">

                    Public

                  </option>

                  <option value="private">

                    Private

                  </option>

                </select>
                <input
                  type="text"
                  placeholder="Cover Image URL"
                  value={coverImage}
                  onChange={(e) =>
                    setCoverImage(e.target.value)
                  }
                  className="border p-4 rounded-2xl outline-none text-black"
                />

                <button

                  onClick={createEvent}

                  className="bg-gradient-to-r from-[#7B2CBF] to-[#4361EE] text-white py-4 rounded-2xl font-bold"

                >

                  Create Event

                </button>

              </div>

            </div>

          </div>

        )

      }

    </div>

  );

};

export default Events;

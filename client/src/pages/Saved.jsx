import Navbar from "../components/Navbar";

import { useEffect, useState } from "react";

import axios from "axios";

const Saved = () => {

  const [collections, setCollections] =
    useState([]);

  const [selectedCollection, setSelectedCollection] =
    useState("all");

  const user = JSON.parse(

    localStorage.getItem("user")

  );

  const fetchCollections = async () => {

    try {

      const res =
        await axios.get(

          `${import.meta.env.VITE_API_URL}/api/collections/${user.email}`

        );

      setCollections(res.data);

    }

    catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchCollections();

  }, []);

  /* ALL MEDIA */

  const allMedia =

    collections.flatMap(

      collection =>
        collection.media

    );

  return (

    <div className="min-h-screen bg-[#f7f7fb]">

      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* TITLE */}

        <h1 className="text-5xl font-black text-[#2d1457]">

          Saved Collections

        </h1>

        <p className="text-gray-500 mt-3 text-lg">

          Your favourite memories ✨

        </p>

        {/* FILTERS */}

        <div className="flex flex-wrap gap-3 mt-10">

          {/* ALL */}

          <button

            onClick={() =>
              setSelectedCollection("all")
            }

            className={`

              px-5 py-2 rounded-full text-sm font-semibold border transition-all

              ${selectedCollection === "all"

                ? "bg-[#2d1457] text-white border-[#2d1457]"

                : "bg-white text-gray-700 border-gray-200"}

            `}

          >

            All

          </button>

          {/* COLLECTIONS */}

          {

            collections.map((collection)=>(

              <button

                key={collection._id}

                onClick={() =>
                  setSelectedCollection(
                    collection
                  )
                }

                className={`

                  px-5 py-2 rounded-full text-sm font-semibold border transition-all

                  ${selectedCollection?._id === collection._id

                    ? "bg-gradient-to-r from-[#7B2CBF] to-[#4361EE] text-white border-transparent"

                    : "bg-white text-gray-700 border-gray-200"}

                `}

              >

                {collection.name}

              </button>

            ))

          }

        </div>

        {/* MEDIA */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">

          {

            (

              selectedCollection === "all"

                ? allMedia

                : selectedCollection?.media

            )?.map((item)=>(

              <div

                key={item._id}

                className="bg-white rounded-[30px] overflow-hidden shadow-lg"

              >

                {

                  item.type === "image"

                    ? (

                      <img

                        src={item.url}

                        className="w-full h-[350px] object-cover"

                      />

                    )

                    : (

                      <video

                        src={item.url}

                        controls

                        className="w-full"

                      />

                    )

                }

                <div className="p-5">

                  <h2 className="font-bold text-[#2d1457] text-lg">

                    {item.caption || "Saved Memory"}

                  </h2>

                  <p className="text-gray-500 mt-2">

                    {item.likes?.length || 0} likes

                  </p>

                </div>

              </div>

            ))

          }

        </div>

      </div>

    </div>

  );

};

export default Saved;
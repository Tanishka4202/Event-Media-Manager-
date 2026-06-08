import { useEffect, useState } from "react";

import axios from "axios";

import Masonry from "react-masonry-css";

import Navbar from "../components/Navbar";
import MediaCard from "../components/MediaCard";
import StoryBar from "../components/StoryBar";
import { QRCode } from "react-qr-code";
import QRShare from "../components/QRShare";
import InfiniteScroll from "react-infinite-scroll-component";


const Gallery = () => {

  const [media, setMedia] = useState([]);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const fetchMedia = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/media/all"
      );

      setMedia(res.data);

      setLoading(false);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchMedia();

  }, []);

 const filteredMedia = media.filter((item) => {

    const searchText =
        search.toLowerCase();

    return (

        item.mediaUrl
            ?.toLowerCase()
            ?.includes(searchText)

        ||

        item.caption
            ?.toLowerCase()
            ?.includes(searchText)

        ||

        item.visibility
            ?.toLowerCase()
            ?.includes(searchText)

        ||

        item.tags?.some((tag) =>

            tag
                ?.toLowerCase()
                ?.includes(searchText)

        )

    );

});
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

  return (

    <div className="min-h-screen bg-black">

      <Navbar />
      <StoryBar />
      {/* HERO */}

      <div className="p-10">

        <h1 className="text-6xl text-green-400 font-black mb-5">
          AI Media Gallery
        </h1>

        <p className="text-gray-400 text-xl">
          Search, explore and discover event memories.
        </p>

      </div>

      {/* SEARCH */}

      <div className="px-10 mb-10">

        <input
          type="text"
          placeholder="Search AI tags, events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-slate-900 text-white p-5 rounded-2xl outline-none text-xl"
        />

      </div>

      {/* FILTER BUTTONS */}

      <div className="flex gap-4 px-10 mb-10 overflow-x-auto">

        <button className="bg-green-500 px-6 py-3 rounded-full text-white">
          All
        </button>

        <button className="bg-slate-800 px-6 py-3 rounded-full text-white">
          Fest
        </button>

        <button className="bg-slate-800 px-6 py-3 rounded-full text-white">
          Workshops
        </button>

        <button className="bg-slate-800 px-6 py-3 rounded-full text-white">
          Sports
        </button>

      </div>

      {/* MASONRY GRID */}

      <div className="px-6">

        <InfiniteScroll
          dataLength={filteredMedia.length}
          next={() => { }}
          hasMore={true}
          loader={
            <h1 className="text-white text-center">
              Loading...
            </h1>
          }
        >
          {filteredMedia.length === 0 && (

            <div className="text-center text-gray-500 text-3xl mt-20">

              No media found 🔍

            </div>

          )}
          {loading && (

            <div className="text-center text-white text-3xl">

              Loading AI Gallery...

            </div>

          )}
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="flex gap-6"
            columnClassName="space-y-6"
          >

            {filteredMedia.map((item) => (

              <MediaCard
                key={item._id}
                item={item}
              />

            ))}

          </Masonry>

        </InfiniteScroll>
        <QRShare />

      </div>
    </div>

  );

};



export default Gallery;
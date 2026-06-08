import { useState } from "react";

import Navbar from "../components/Navbar";

const AIPhotos = () => {

  const [preview, setPreview] = useState(null);

  const handleImage = (e) => {

    const file = e.target.files[0];

    setPreview(
      URL.createObjectURL(file)
    );

  };

  return (

    <div className="min-h-screen bg-black text-white">

      <Navbar />

      <div className="p-10">

        <h1 className="text-6xl font-black text-green-400 mb-10">
          AI Face Match
        </h1>

        <div className="bg-slate-900 p-10 rounded-3xl">

          <input
            type="file"
            onChange={handleImage}
            className="mb-10"
          />

          {preview && (

            <div>

              <img
                src={preview}
                alt=""
                className="w-[300px] rounded-3xl"
              />

              <button
                className="mt-10 bg-green-500 px-8 py-4 rounded-2xl"
              >
                Find My Photos 🔍
              </button>

            </div>

          )}

        </div>

        {/* RESULTS */}

        <div className="mt-20">

          <h1 className="text-4xl font-bold mb-10">
            Matching Photos
          </h1>

          <div className="grid md:grid-cols-3 gap-10">

            <img
              src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1"
              className="rounded-3xl"
            />

            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
              className="rounded-3xl"
            />

            <img
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9"
              className="rounded-3xl"
            />

          </div>

        </div>

      </div>

    </div>

  );

};

export default AIPhotos;
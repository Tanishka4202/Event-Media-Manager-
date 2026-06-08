import Navbar from "../components/Navbar";

const EventDetails = () => {

  return (

    <div className="min-h-screen bg-black text-white">

      <Navbar />

      {/* COVER */}

      <div className="h-[400px] bg-gradient-to-r from-green-500 to-black flex items-center justify-center">

        <h1 className="text-7xl font-black">
          Cultural Fest 2026
        </h1>

      </div>

      {/* INFO */}

      <div className="p-10">

        <div className="flex gap-6 mb-10">

          <span className="bg-green-500 px-5 py-2 rounded-full">
            Fest
          </span>

          <span className="bg-slate-800 px-5 py-2 rounded-full">
            120 Photos
          </span>

          <span className="bg-slate-800 px-5 py-2 rounded-full">
            Public
          </span>

        </div>

        <p className="text-gray-400 text-xl leading-relaxed">

          Annual cultural fest featuring performances,
          competitions, workshops and concerts.

        </p>

      </div>

    </div>

  );

};

export default EventDetails;
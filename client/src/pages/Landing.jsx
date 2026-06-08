import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Landing = () => {

  return (

    <div className="min-h-screen bg-black text-white overflow-hidden">

      {/* HERO */}

      <div className="h-screen flex flex-col justify-center items-center relative">

        <div className="absolute w-[500px] h-[500px] bg-green-500 blur-[150px] opacity-20 rounded-full"></div>

        <motion.h1
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-8xl font-black text-center z-10"
        >
          EventSphere AI
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-2xl text-gray-400 mt-6 z-10"
        >
          AI Powered Event & Media Platform
        </motion.p>

        <div className="flex gap-6 mt-10 z-10">

          <Link
            to="/gallery"
            className="bg-green-500 px-8 py-4 rounded-2xl text-xl"
          >
            Explore Gallery
          </Link>

          <Link
            to="/upload"
            className="border border-white px-8 py-4 rounded-2xl text-xl"
          >
            Upload Media
          </Link>

        </div>

      </div>

      {/* FEATURES */}

      <div className="p-20 grid md:grid-cols-3 gap-10">

        <div className="bg-slate-900 p-10 rounded-3xl">
          <h1 className="text-3xl font-bold text-green-400 mb-5">
            AI Tagging
          </h1>

          <p className="text-gray-400">
            Automatically detects crowd, sports, beaches,
            mountains and generates smart tags.
          </p>
        </div>

        <div className="bg-slate-900 p-10 rounded-3xl">
          <h1 className="text-3xl font-bold text-green-400 mb-5">
            Facial Recognition
          </h1>

          <p className="text-gray-400">
            Find your photos instantly using AI powered
            face matching.
          </p>
        </div>

        <div className="bg-slate-900 p-10 rounded-3xl">
          <h1 className="text-3xl font-bold text-green-400 mb-5">
            Cloud Storage
          </h1>

          <p className="text-gray-400">
            Scalable cloud-based media storage powered
            by Cloudinary.
          </p>
        </div>

      </div>

    </div>

  );

};

export default Landing;
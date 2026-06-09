import Navbar from "../components/Navbar";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const Dashboard = () => {

  const data = [

    {
      name: "Fest",
      uploads: 120
    },

    {
      name: "Workshop",
      uploads: 80
    },

    {
      name: "Sports",
      uploads: 150
    }

  ];

return (

  <div className="min-h-screen bg-gradient-to-br from-[#f8f5ff] via-[#fcfbff] to-[#eef2ff]">

    <Navbar />

    <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">

      <h1 className="text-4xl md:text-5xl font-black text-[#2d1457] mb-3">

        Analytics Dashboard

      </h1>

      <p className="text-gray-500 text-lg">

        Track uploads, engagement and event performance.

      </p>

      {/* STATS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">

        <div className="bg-white rounded-3xl p-8 shadow-lg">

          <h2 className="text-gray-500 text-lg">
            Media Uploads
          </h2>

          <h1 className="text-5xl font-black text-[#7B2CBF] mt-4">
            120
          </h1>

        </div>

        <div className="bg-white rounded-3xl p-8 shadow-lg">

          <h2 className="text-gray-500 text-lg">
            Likes
          </h2>

          <h1 className="text-5xl font-black text-[#4361EE] mt-4">
            540
          </h1>

        </div>

        <div className="bg-white rounded-3xl p-8 shadow-lg">

          <h2 className="text-gray-500 text-lg">
            Events
          </h2>

          <h1 className="text-5xl font-black text-pink-500 mt-4">
            24
          </h1>

        </div>

      </div>

      {/* CHART */}

      <div className="bg-white rounded-3xl shadow-lg p-8 mt-12 h-[420px]">

        <ResponsiveContainer width="100%" height="100%">

          <BarChart data={data}>

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="uploads"
              fill="#7B2CBF"
              radius={[10, 10, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>

  </div>

);

};

export default Dashboard;
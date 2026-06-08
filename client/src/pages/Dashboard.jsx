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

    <div className="min-h-screen bg-black text-white">

      <Navbar />

      <div className="p-10">

        <h1 className="text-6xl font-black text-green-400 mb-10">
          Analytics Dashboard
        </h1>

        <div className="grid md:grid-cols-3 gap-10 mb-20">

          <div className="bg-slate-900 p-10 rounded-3xl">
            <h1 className="text-5xl font-bold">
              120
            </h1>

            <p className="text-gray-400 mt-3">
              Media Uploads
            </p>
          </div>

          <div className="bg-slate-900 p-10 rounded-3xl">
            <h1 className="text-5xl font-bold">
              540
            </h1>

            <p className="text-gray-400 mt-3">
              Likes
            </p>
          </div>

          <div className="bg-slate-900 p-10 rounded-3xl">
            <h1 className="text-5xl font-bold">
              24
            </h1>

            <p className="text-gray-400 mt-3">
              Events
            </p>
          </div>

        </div>

        {/* CHART */}

        <div className="bg-slate-900 p-10 rounded-3xl h-[500px]">

          <ResponsiveContainer width="100%" height="100%">

            <BarChart data={data}>

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="uploads"
                fill="#22c55e"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>

  );

};

export default Dashboard;
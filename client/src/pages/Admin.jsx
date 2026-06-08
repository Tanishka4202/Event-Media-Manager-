import Navbar from "../components/Navbar";

const Admin = () => {

  return (

    <div className="min-h-screen bg-black text-white">

      <Navbar />

      <div className="p-10">

        <h1 className="text-6xl font-black text-red-500 mb-10">
          Admin Panel
        </h1>

        <div className="grid md:grid-cols-3 gap-10">

          <div className="bg-slate-900 p-10 rounded-3xl">

            <h1 className="text-4xl font-bold">
              1200
            </h1>

            <p className="text-gray-400 mt-3">
              Total Uploads
            </p>

          </div>

          <div className="bg-slate-900 p-10 rounded-3xl">

            <h1 className="text-4xl font-bold">
              300
            </h1>

            <p className="text-gray-400 mt-3">
              Active Users
            </p>

          </div>

          <div className="bg-slate-900 p-10 rounded-3xl">

            <h1 className="text-4xl font-bold">
              45
            </h1>

            <p className="text-gray-400 mt-3">
              Flagged Media
            </p>

          </div>

        </div>

      </div>

    </div>

  );

};

export default Admin;
import Navbar from "../components/Navbar";

const Events = () => {

  const dummyEvents = [

    {
      title: "Cultural Fest",
      desc: "Annual college fest",
      category: "Fest",
      date: "12 March 2026"
    },

    {
      title: "Photography Walk",
      desc: "Campus photography event",
      category: "Photography",
      date: "20 April 2026"
    },

    {
      title: "Hackathon",
      desc: "24 hour coding challenge",
      category: "Tech",
      date: "2 May 2026"
    }

  ];

  return (

    <div className="min-h-screen bg-slate-950">

      <Navbar />

      <div className="p-10">

        <h1 className="text-5xl font-bold text-green-400 mb-10">
          Events
        </h1>

        <div className="grid md:grid-cols-3 gap-8">

          {dummyEvents.map((event, index) => (

            <div
              key={index}
              className="bg-slate-900 p-6 rounded-2xl shadow-xl"
            >

              <h2 className="text-3xl text-white font-bold mb-4">
                {event.title}
              </h2>

              <p className="text-gray-400 mb-4">
                {event.desc}
              </p>
              <p className="text-gray-500 mb-4">
                📅 {event.date}
              </p>

              <span className="bg-green-500 px-4 py-2 rounded-lg text-white">
                {event.category}
              </span>

              <div className="mt-6 flex -space-x-4">

                <img
                  src="https://i.pravatar.cc/50?img=1"
                  className="w-10 h-10 rounded-full border-2 border-black"
                />

                <img
                  src="https://i.pravatar.cc/50?img=2"
                  className="w-10 h-10 rounded-full border-2 border-black"
                />

                <img
                  src="https://i.pravatar.cc/50?img=3"
                  className="w-10 h-10 rounded-full border-2 border-black"
                />

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

};

export default Events;
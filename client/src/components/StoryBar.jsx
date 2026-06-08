const StoryBar = () => {

  const stories = [

    "https://images.unsplash.com/photo-1506744038136-46273834b3fb",

    "https://images.unsplash.com/photo-1494526585095-c41746248156",

    "https://images.unsplash.com/photo-1517841905240-472988babdf9",

    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1"

  ];

  return (

    <div className="flex gap-6 overflow-x-auto p-6">

      {stories.map((story, index) => (

        <div
          key={index}
          className="flex flex-col items-center"
        >

          <div className="p-1 rounded-full bg-gradient-to-r from-pink-500 to-green-500">

            <img
              src={story}
              alt=""
              className="w-24 h-24 rounded-full object-cover"
            />

          </div>

          <p className="text-white mt-2">
            Story
          </p>

        </div>

      ))}

    </div>

  );

};

export default StoryBar;
import { useEffect, useState } from "react";

import axios from "axios";

import Navbar from "../components/Navbar";

import MediaCard from "../components/MediaCard";
const Profile = () => {
    const [myUploads, setMyUploads] =
        useState([]);

    const [media, setMedia] = useState([]);
    const user = JSON.parse(

        localStorage.getItem(
            "user"
        )

    ) || {};
    const fetchMyUploads = async () => {

        try {

            const res = await axios.get(

                "http://localhost:5000/api/media/my-uploads",

                {

                    headers: {

                        authorization:
                            localStorage.getItem(
                                "token"
                            )

                    }

                }

            );

            setMedia(res.data);

        } catch (error) {

            console.log(error);

        }

    };
    const fetchUser = async () => {

        try {

            const res = await axios.get(

                "http://localhost:5000/api/auth/me",

                {

                    headers: {

                        authorization:
                            localStorage.getItem(
                                "token"
                            )

                    }

                }

            );

            setUser(res.data);

        } catch (error) {

            console.log(error);

        }

    };
    useEffect(() => {

        fetchMyUploads();

        fetchUser();

    }, []);
    useEffect(() => {

        const fetchUploads =
            async () => {

                try {

                    const res =
                        await axios.get(

                            `${import.meta.env.VITE_API_URL}/api/media/all`

                        );

                    const filtered =
                        res.data.filter(

                            (item) =>

                                item.uploadedBy ===

                                user?.name

                        );

                    setMyUploads(
                        filtered
                    );

                }

                catch (error) {

                    console.log(error);

                }

            };

        fetchUploads();

    }, []);

    return (

        <div className="min-h-screen bg-[#f6f4ff]">

            <Navbar />

            <div className="max-w-7xl mx-auto px-6 py-10">

                {/* PROFILE HEADER */}

                <div className="bg-white rounded-[35px] p-8 shadow-xl border border-gray-100 flex flex-col md:flex-row items-center md:items-start gap-8">

                    <img

                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || "User"}`}

                        alt="profile"

                        className="w-32 h-32 rounded-full border-4 border-[#7B2CBF] shadow-lg"

                    />

                    <div className="flex-1 text-center md:text-left">

                        <h1 className="text-5xl font-black bg-gradient-to-r from-[#7B2CBF] to-[#4361EE] bg-clip-text text-transparent">

                            {user?.name || "User"}

                        </h1>

                        <p className="text-gray-500 mt-3 text-lg">

                            {user?.email || "No email"}

                        </p>

                        <div className="mt-5 inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#f3ebff] text-[#7B2CBF] font-semibold">

                            {user.role || "viewer"}

                        </div>

                    </div>

                </div>

                {/* STATS */}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

                    <div className="bg-gradient-to-r from-[#7B2CBF] to-[#9D4EDD] rounded-[30px] p-8 text-white shadow-xl">

                        <h2 className="text-lg opacity-80">

                            Uploads

                        </h2>

                        <h1 className="text-5xl font-black mt-3">

                            {myUploads.length}

                        </h1>

                    </div>

                    <div className="bg-gradient-to-r from-[#4361EE] to-[#3A86FF] rounded-[30px] p-8 text-white shadow-xl">

                        <h2 className="text-lg opacity-80">

                            Total Likes

                        </h2>

                        <h1 className="text-5xl font-black mt-3">

                            {

                                myUploads.reduce(

                                    (acc, item) =>

                                        acc +

                                        (item.likes?.length || 0),

                                    0

                                )

                            }

                        </h1>

                    </div>

                    <div className="bg-gradient-to-r from-[#F72585] to-[#FF4D6D] rounded-[30px] p-8 text-white shadow-xl">

                        <h2 className="text-lg opacity-80">

                            Events

                        </h2>

                        <h1 className="text-5xl font-black mt-3">

                            {

                                new Set(

                                    myUploads.map(

                                        (item) => item.eventId

                                    )

                                ).size

                            }

                        </h1>

                    </div>

                </div>

                {/* MY UPLOADS */}

                <div className="mt-14">

                    <div className="flex items-center justify-between mb-8">

                        <h1 className="text-4xl font-black text-[#2d1457]">

                            My Uploads

                        </h1>

                        <div className="px-5 py-2 rounded-full bg-[#f3ebff] text-[#7B2CBF] font-semibold">

                            {myUploads.length} Files

                        </div>

                    </div>

                    {

                        myUploads.length === 0

                            ? (

                                <div className="bg-white rounded-[30px] p-20 text-center shadow-xl">

                                    <h1 className="text-3xl font-black text-[#2d1457]">

                                        No uploads yet 😭

                                    </h1>

                                    <p className="text-gray-500 mt-4">

                                        Upload media to see your content here.

                                    </p>

                                </div>

                            )

                            : (

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

                                    {

                                        myUploads.map((item) => (

                                            <div

                                                key={item._id}

                                                className="bg-white rounded-[30px] overflow-hidden shadow-xl hover:scale-[1.02] transition-all duration-300"

                                            >

                                                {

                                                    item.type === "image"

                                                        ? (

                                                            <img

                                                                src={item.url}

                                                                alt="media"

                                                                className="w-full h-[280px] object-cover"

                                                            />

                                                        )

                                                        : (

                                                            <video

                                                                src={item.url}

                                                                controls

                                                                className="w-full h-[280px] object-cover"

                                                            />

                                                        )

                                                }

                                                <div className="p-5">

                                                    <div className="flex flex-wrap gap-2">

                                                        {

                                                            item.tags?.slice(0, 3).map((tag, index) => (

                                                                <span

                                                                    key={index}

                                                                    className="px-3 py-1 rounded-full bg-[#f3ebff] text-[#7B2CBF] text-xs font-semibold"

                                                                >

                                                                    #{tag}

                                                                </span>

                                                            ))

                                                        }

                                                    </div>

                                                    <div className="flex items-center justify-between mt-5 text-gray-500">

                                                        <div className="flex items-center gap-2">

                                                            ❤️

                                                            {item.likes?.length || 0}

                                                        </div>

                                                        <div>

                                                            💬 {item.comments?.length || 0}

                                                        </div>

                                                    </div>

                                                </div>

                                            </div>

                                        ))

                                    }

                                </div>

                            )

                    }

                </div>

            </div>

        </div>

    );

};

export default Profile;
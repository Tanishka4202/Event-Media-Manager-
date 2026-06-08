import { useEffect, useState } from "react";

import axios from "axios";

import Navbar from "../components/Navbar";

import MediaCard from "../components/MediaCard";

const Profile = () => {

    const [media, setMedia] = useState([]);
    const [user, setUser] = useState(null);

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
    return (

        <div className="min-h-screen bg-black text-white">

            <Navbar />

            <div className="p-10">

                <div className="flex items-center gap-10 mb-20">

                    <img
                        src="https://i.pravatar.cc/200"
                        className="w-32 h-32 rounded-full"
                    />

                    <div>

                        <h1 className="text-5xl font-black text-green-400">
                            {user?.name}
                        </h1>

                        <p className="text-gray-400 mt-4">
                           {user?.email}
                        </p>

                    </div>

                </div>

                {/* USER STATS */}

                <div className="grid md:grid-cols-3 gap-10 mb-20">

                    <div className="bg-slate-900 p-8 rounded-3xl">

                        <h1 className="text-4xl font-bold">
                            {media.length}
                        </h1>

                        <p className="text-gray-400 mt-3">
                            Uploads
                        </p>

                    </div>

                    <div className="bg-slate-900 p-8 rounded-3xl">

                        <h1 className="text-4xl font-bold">
                            540
                        </h1>

                        <p className="text-gray-400 mt-3">
                            Likes
                        </p>

                    </div>

                    <div className="bg-slate-900 p-8 rounded-3xl">

                        <h1 className="text-4xl font-bold">
                            12
                        </h1>

                        <p className="text-gray-400 mt-3">
                            Events
                        </p>

                    </div>

                </div>

                {/* MY UPLOADS */}

                <h1 className="text-4xl font-bold mb-10">
                    My Uploads
                </h1>

                <div className="grid md:grid-cols-3 gap-10">

                    {media.map((item) => (

                        <MediaCard
                            key={item._id}
                            item={item}
                        />

                    ))}

                </div>

            </div>

        </div>

    );

};

export default Profile;
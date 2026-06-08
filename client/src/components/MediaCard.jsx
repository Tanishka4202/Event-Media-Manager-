import { motion } from "framer-motion";

import { useState } from "react";
import socket from "../socket";
import axios from "axios";

const MediaCard = ({ item }) => {

    const [comment, setComment] = useState("");

    // LIKE FUNCTION

    const handleLike = async () => {

        try {

            await axios.put(
                `http://localhost:5000/api/media/like/${item._id}`
            );

            socket.emit(
                "send_notification",
                "Someone liked a photo ❤️"
            );

            window.location.reload();

        } catch (error) {

            console.log(error);

        }

    };

    // COMMENT FUNCTION

    const handleComment = async () => {

        try {

            await axios.put(

                `http://localhost:5000/api/media/comment/${item._id}`,

                {
                    text: comment
                }

            );

            socket.emit(
                "send_notification",
                "New comment added 💬"
            );

            window.location.reload();

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <motion.div

            whileHover={{
                scale: 1.03
            }}

            className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl mb-6"
        >

            <img
                src={item.mediaUrl}
                alt=""
                className="w-full object-cover"
            />

            <div className="p-5 text-white">

                {/* HEADER */}

                <div className="flex justify-between items-center">

                    <h1 className="text-xl font-bold">
                        Event Media
                    </h1>

                    <span className="text-green-400">
                        AI Tagged
                    </span>
                    <p className="text-sm text-gray-400 mt-2">
                        {item.visibility}
                    </p>

                </div>

                {/* DESCRIPTION */}

                <p className="text-gray-400 mt-3">
                    Uploaded media from events gallery.
                </p>

                {/* AI CAPTION */}

                <p className="text-gray-500 mt-3 italic">
                    {item.caption}
                </p>

                {/* TAGS */}

                <div className="flex gap-2 mt-4 flex-wrap">

                    {item.tags?.map((tag, index) => (

                        <span
                            key={index}
                            className="bg-green-500 px-3 py-1 rounded-full text-sm"
                        >
                            #{tag}
                        </span>

                    ))}

                </div>

                {/* ACTIONS */}

                <div className="flex justify-between mt-6">

                    <button
                        onClick={handleLike}
                        className="bg-green-500 px-4 py-2 rounded-xl"
                    >
                        ❤️ {item.likes}
                    </button>

                    <a
                        href={`${item.mediaUrl}?text=EventSphereAI`}
                        target="_blank"
                        className="bg-blue-500 px-4 py-2 rounded-xl"
                    >
                        Download
                    </a>

                </div>

                {/* WATERMARK */}

                <p className="text-gray-500 mt-4 text-sm">
                    Watermarked Download Enabled
                </p>

                {/* COMMENT INPUT */}

                <div className="mt-6">

                    <input
                        type="text"
                        placeholder="Add comment..."
                        value={comment}
                        onChange={(e) =>
                            setComment(e.target.value)
                        }
                        className="w-full p-3 rounded-xl bg-slate-800 text-white outline-none"
                    />

                    <button
                        onClick={handleComment}
                        className="mt-3 bg-green-500 px-5 py-2 rounded-xl"
                    >
                        Comment
                    </button>

                </div>

                {/* COMMENTS */}

                <div className="mt-4">

                    {item.comments?.map((c, index) => (

                        <div
                            key={index}
                            className="bg-slate-800 p-3 rounded-xl mt-2 text-white"
                        >
                            💬 {c.text}
                        </div>

                    ))}

                </div>

            </div>

        </motion.div>

    );

};

export default MediaCard;
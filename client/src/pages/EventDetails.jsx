import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

import {

  FaImages,
  FaVideo,
  FaUpload,
  FaTrash,
  FaHeart,
  FaComment,
  FaShare,
  FaDownload,
  FaBookmark,
  FaTag,
  FaUserAlt

} from "react-icons/fa";

const EventDetails = () => {

  // IMPORTANT
  // Later backend se dynamic hoga
  // abhi testing ke liye fixed


  const [showUpload, setShowUpload] =
    useState(false);

  const [selectedFiles, setSelectedFiles] = useState([]);

  const [media, setMedia] = useState([]);
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [caption, setCaption] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [showShare, setShowShare] = useState(false);
  const [selectedShareMedia, setSelectedShareMedia] = useState(null);
  const [showCollectionModal, setShowCollectionModal] = useState(false);
  const [collections, setCollections] = useState([]);
  const [selectedMediaId, setSelectedMediaId] = useState(null);
  const [newCollection, setNewCollection] = useState("");

  // FETCH MEDIA

  const fetchMedia = async () => {

    try {

      const res =
        await axios.get(

          `${import.meta.env.VITE_API_URL}/api/media/all/${id}`

        );

      setMedia(res.data);

    }

    catch (error) {

      console.log(error);

    }

  };
  const fetchEvent = async () => {

    try {

      const res =
        await axios.get(

          `${import.meta.env.VITE_API_URL}/api/events/${id}`

        );

      setEvent(res.data);

    }

    catch (error) {

      console.log(error);

    }

  };
  const fetchCollections = async () => {

    try {

      const res =
        await axios.get(

          `${import.meta.env.VITE_API_URL}/api/collections/${user.email}`

        );

      setCollections(res.data);

    }

    catch (error) {

      console.log(error);

    }

  };
  useEffect(() => {

    fetchMedia();

    fetchEvent();
    fetchCollections();

  }, []);

  // HANDLE FILES

  const handleFiles = (e) => {

    const files = Array.from(e.target.files);

    setSelectedFiles((prev) => [...prev, ...files]);

  };

  // REMOVE PREVIEW FILE

  const removeFile = (indexToRemove) => {

    const updated =
      selectedFiles.filter(

        (_, index) =>
          index !== indexToRemove

      );

    setSelectedFiles(updated);

  };

  const createCollection = async () => {

    try {

      if (!newCollection.trim())
        return;

      const res =
        await axios.post(

          `${import.meta.env.VITE_API_URL}/api/collections/create`,

          {

            name: newCollection,

            userEmail:
              user.email

          }

        );

      /* UPDATE UI */

      setCollections((prev) => ([

        ...prev,

        res.data

      ]));

      toast.success(
        "Collection created 😭🔥"
      );

      /* CLEAR INPUT */

      setNewCollection("");

    }

    catch (error) {

      console.log(error);

      toast.error(
        "Failed to create collection"
      );

    }

  };

  const saveToCollection = async (
    collectionId
  ) => {

    try {

      await axios.put(

        `${import.meta.env.VITE_API_URL}/api/collections/save`,

        {

          collectionId,

          mediaId:
            selectedMediaId

        }

      );

      toast.success(
        "Saved 😭🔥"
      );

      setShowCollectionModal(false);

    }

    catch (error) {

      console.log(error);

    }

  };

  // UPLOAD

  const uploadMedia = async () => {

    try {

      if (selectedFiles.length === 0) {

        return toast.error(
          "Select files first"
        );

      }
      const token = localStorage.getItem("token");
      for (const file of selectedFiles) {

        const formData =
          new FormData();

        formData.append(
          "file",
          file
        );

        formData.append(
          "visibility",
          "public"
        );

        formData.append(
          "eventId",
          id
        );

        formData.append(
          "uploadedBy",
          "Tanishka"
        );
        formData.append(
          "caption",
          caption
        );

        await axios.post(

          `${import.meta.env.VITE_API_URL}/api/media/upload`,

          formData,

          {

            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data"
            }

          }

        );

      }

      toast.success(
        "Media uploaded 🚀"
      );

      setShowUpload(false);

      setSelectedFiles([]);

      fetchMedia();

    }

    catch (error) {

      console.log(error);

      toast.error(
        "Upload failed"
      );

    }

  };

  const deleteMedia = async (id) => {

    try {

      await axios.delete(

        `${import.meta.env.VITE_API_URL}/api/media/${id}`

      );

      toast.success(
        "Media deleted"
      );

      fetchMedia();

    }

    catch (error) {

      console.log(error);

      toast.error(
        "Delete failed"
      );

    }

  };
  const likeMedia = async (mediaId) => {

    try {

      const user = JSON.parse(

        localStorage.getItem("user")

      );

      await axios.put(

        `${import.meta.env.VITE_API_URL}/api/media/like/${mediaId}`,

        {

          userId: user._id

        }

      );

      socket.emit(

        "send_notification",

        {

          message:
            `${user.name} liked a photo ❤️`

        }

      );

      fetchMedia();

    }

    catch (error) {

      console.log(error);

    }

  };
  const shareMedia = async (mediaId) => {

    try {

      const shareLink =

        `${window.location.origin}/event/${id}`;

      // MOBILE SHARE API

      if (navigator.share) {

        await navigator.share({

          title: "EventSphere AI",

          text:
            "Check out this event media!",

          url: shareLink

        });

      }

      // FALLBACK COPY

      else {

        await navigator.clipboard.writeText(
          shareLink
        );

        toast.success(
          "Link copied 🚀"
        );

      }

    }

    catch (error) {

      console.log(error);

    }

  };
  const commentMedia = async (mediaId) => {

    try {

      const user = JSON.parse(

        localStorage.getItem("user")

      );

      await axios.put(

        `${import.meta.env.VITE_API_URL}/api/media/comment/${mediaId}`,

        {

          user: user.name,

          text: commentText

        }

      );

      socket.emit(

        "send_notification",

        {

          message:
            `${user.name} commented 💬`

        }

      );

      setCommentText("");

      fetchMedia();

    }

    catch (error) {

      console.log(error);

    }

  };
  const saveMedia = async (
    mediaId
  ) => {

    try {

      const res =
        await axios.put(

          `${import.meta.env.VITE_API_URL}/api/media/save/${mediaId}`,

          {

            userEmail:
              user.email

          }

        );

      setMedia(

        media.map((item) =>

          item._id === mediaId
            ? res.data
            : item

        )

      );

    }

    catch (error) {

      console.log(error);

    }

  };

  const user = JSON.parse(
    localStorage.getItem("user")
  );


  const addComment = async (
    mediaId
  ) => {

    try {

      if (!commentText.trim())
        return;

      /* STORE CURRENT TEXT */

      const text =
        commentText;

      /* CLEAR INPUT IMMEDIATELY */

      setCommentText("");

      /* CREATE COMMENT */

      const newComment = {

        user: user.name,

        text

      };

      /* UPDATE MEDIA STATE INSTANTLY */

      setMedia((prevMedia) =>

        prevMedia.map((item) => {

          if (item._id === mediaId) {

            return {

              ...item,

              comments: [

                newComment,

                ...(item.comments || [])

              ]

            };

          }

          return item;

        })

      );

      /* UPDATE OPEN POPUP */

      setSelectedMedia((prev) => {

        if (!prev)
          return prev;

        return {

          ...prev,

          comments: [

            newComment,

            ...(prev.comments || [])

          ]

        };

      });

      /* SAVE TO DATABASE */

      await axios.post(

        `${import.meta.env.VITE_API_URL}/api/media/comment/${mediaId}`,

        {

          user: user.name,

          text

        }

      );

      /* REALTIME NOTIFICATION */

      socket.emit(

        "send_notification",

        {

          id: Date.now(),

          text:
            `${user.name} commented on your upload 💬`

        }

      );

    }

    catch (error) {

      console.log(error);

    }

  };
  const allMedia =

    collections.flatMap(

      collection =>
        collection.media

    );
  const [selectedMedia, setSelectedMedia] =
    useState(null);
  if (!event) {

    return (

      <div className="min-h-screen flex items-center justify-center text-3xl font-bold text-[#7B2CBF]">

        Loading Event...

      </div>

    );

  }



  return (

    <div className="min-h-screen bg-gradient-to-br from-[#f8f5ff] via-[#fcfbff] to-[#eef2ff]">

      <Navbar />

      {/* MAIN */}

      <div className="max-w-6xl mx-auto px-5 lg:px-8 py-10">

        {/* HEADER */}
        <div className="grid lg:grid-cols-2 gap-14 items-start">

          {/* LEFT */}

          <div>

            {/* TITLE */}

            <h1 className="text-6xl font-black text-[#2d1457] leading-none">

              {event?.name}

            </h1>

            {/* CATEGORY */}

            <span className="inline-block mt-5 bg-gradient-to-r from-[#7B2CBF] to-[#4361EE] text-white px-5 py-2 rounded-full shadow-lg text-sm">

              {event?.category}

            </span>

            {/* DESCRIPTION */}

            <p className="text-gray-500 mt-6 text-xl leading-relaxed max-w-2xl">

              {event?.description}

            </p>

            {/* CAPTION */}

            <textarea

              placeholder="Write a caption..."

              value={caption}

              onChange={(e) =>
                setCaption(e.target.value)
              }

              className="w-full mt-8 h-[180px] bg-white rounded-[28px] shadow-lg border p-6 outline-none text-black resize-none"

            ></textarea>

          </div>

          {/* RIGHT */}

          <div>

            {/* UPLOAD BUTTON */}

            <button

              onClick={() =>
                setShowUpload(true)
              }

              className="w-full bg-gradient-to-r from-[#7B2CBF] to-[#4361EE] text-white py-5 rounded-[24px] shadow-xl flex items-center justify-center gap-3 hover:scale-[1.02] transition-all font-semibold text-lg"

            >

              <FaUpload className="text-sm" />

              Upload Media

            </button>

            {/* STATS */}

            <div className="grid grid-cols-2 gap-5 mt-8">

              {/* CARD */}

              <div className="bg-white rounded-[24px] shadow-lg p-6">

                <FaImages className="text-lg text-[#7B2CBF]" />

                <h1 className="text-3xl font-black mt-4 text-[#2d1457]">

                  320

                </h1>

                <p className="text-gray-500 mt-1">

                  Photos

                </p>

              </div>

              {/* CARD */}

              <div className="bg-white rounded-[24px] shadow-lg p-6">

                <FaVideo className="text-lg text-[#4361EE]" />

                <h1 className="text-3xl font-black mt-4 text-[#2d1457]">

                  42

                </h1>

                <p className="text-gray-500 mt-1">

                  Videos

                </p>

              </div>

              {/* CARD */}

              <div className="bg-white rounded-[24px] shadow-lg p-6">

                <FaUpload className="text-lg text-pink-500" />

                <h1 className="text-3xl font-black mt-4 text-[#2d1457]">

                  12GB

                </h1>

                <p className="text-gray-500 mt-1">

                  Storage

                </p>

              </div>

              {/* CARD */}

              <div className="bg-white rounded-[24px] shadow-lg p-6">

                <FaUserAlt className="text-lg text-green-500" />

                <h1 className="text-3xl font-black mt-4 text-[#2d1457]">

                  18

                </h1>

                <p className="text-gray-500 mt-1">

                  Contributors

                </p>

              </div>

            </div>

          </div>

        </div>
        {/* MEDIA GRID */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7 mt-14">

          {
            media.map((item, index) => {

              const isLiked =

                item.likes?.includes(
                  user?.email
                );
              const isSaved =

                item.savedBy?.includes(
                  user?.email
                );

              return (

                <div key={index}
                  className="bg-white rounded-[30px] overflow-hidden shadow-xl relative group">
                  <button

                    onClick={() =>
                      deleteMedia(item._id)
                    } className="absolute top-4 right-4 w-11 h-11 rounded-full bg-red-500/90 backdrop-blur-md
  text-white flex items-center justify-center shadow-2xl opacity-0 group-hover:opacity-100
 translate-y-[-10px] group-hover:translate-y-0 transition-all duration-300 hover:scale-110 hover:bg-red-600 z-50">

                    <FaTrash className="text-sm" />

                  </button>
                  {

                    item.type === "image"

                      ? (

                        <img

                          src={item.url}

                          alt="media"

                          className="w-full h-[260px] object-cover"

                        />

                      )

                      : (

                        <video

                          src={item.url}

                          controls

                          className="w-full h-[260px] object-cover"

                        />

                      )



                  }
                  <div className="flex items-center justify-between px-5 py-4">

                    {/* LEFT */}

                    <div className="flex items-center gap-6 mt-4">

                      {/* LIKE */}

                      <button

                        onClick={() => {

                          likeMedia(item._id);

                          socket.emit(

                            "send_notification",

                            {

                              id: Date.now(),

                              text:
                                `${user.name} liked your photo ❤️`

                            }

                          );

                        }} className={`flex items-center gap-2 transition-all ${isLiked

                          ? "text-red-500"

                          : "text-gray-500 hover:text-red-500"}

`}>

                        <FaHeart />

                        <span>

                          {item.likes?.length || 0}

                        </span>

                      </button>

                      {/* COMMENT */}

                      <button

                        onClick={() => {

                          setSelectedMedia(item);

                          setShowComments(true);

                        }}

                        className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-all"

                      >

                        <FaComment />

                        <span>

                          {item.comments?.length || 0}

                        </span>

                      </button>

                      {/* SHARE */}

                      <button

                        onClick={() => {

                          setSelectedShareMedia(item);

                          setShowShare(true);

                        }}

                        className="flex items-center gap-2 text-gray-500 hover:text-green-500 transition-all"

                      >

                        <FaShare />

                        <span className="text-base">

                          {item.shares || 0}

                        </span>

                      </button>

                    </div>

                    {/* RIGHT */}

                    <div className="flex items-center gap-5">

                      <button

                        onClick={() => {

                          setSelectedMediaId(
                            item._id
                          );

                          setShowCollectionModal(true);

                        }}
                        className={`transition-all ${isSaved
                          ? "text-purple-500"
                          : "text-gray-500 hover:text-purple-500"} `}

                      >

                        <FaBookmark />

                      </button>

                      <a

                        href={item.url}

                        download

                        className="text-gray-500 hover:text-[#7B2CBF] transition-all"

                      >

                        <FaDownload />

                      </a>

                    </div>

                  </div>
                  <div className="px-5 pb-4">

                    <p className="font-semibold text-sm text-[#2d1457]">

                      {item.likes?.length || 0} likes

                    </p>

                  </div>

                </div>

              );

            })
          }

        </div>

      </div>

      {/* MODAL */}

      {

        showUpload && (

          <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-[999] px-4">

            {/* BOX */}

            <div className="w-full max-w-3xl bg-white rounded-[35px] shadow-2xl p-8 relative animate-fadeIn max-h-[90vh] overflow-y-auto">

              {/* CLOSE */}

              <button

                onClick={() =>
                  setShowUpload(false)
                }

                className="absolute top-5 right-5 text-3xl text-gray-400 hover:text-red-500"

              >

                ×

              </button>

              {/* TITLE */}

              <h1 className="text-4xl font-black text-[#2d1457] text-center">

                Upload Event Media

              </h1>

              <p className="text-gray-500 text-center mt-3">

                Upload photos and videos for this event

              </p>

              {/* DROPZONE */}

              <label className="mt-10 border-2 border-dashed border-[#7B2CBF] rounded-[30px] h-[260px] flex flex-col items-center justify-center cursor-pointer bg-[#faf7ff] hover:bg-[#f3ebff] transition-all">

                <FaUpload className="text-5xl text-[#7B2CBF]" />

                <p className="mt-5 text-xl font-semibold text-[#2d1457]">

                  Drag & Drop Files

                </p>

                <p className="text-gray-500 mt-2">

                  or click to browse

                </p>

                <input

                  type="file"

                  multiple

                  accept="image/*,video/*"

                  className="hidden"

                  onChange={handleFiles}

                />

              </label>

              {/* PREVIEW */}

              {

                selectedFiles.length > 0 && (

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">

                    {

                      selectedFiles.map((file, index) => (

                        <div

                          key={index}

                          className="bg-white rounded-[30px] overflow-hidden shadow-xl relative group hover:scale-[1.02] transition-all duration-300"

                        >

                          {/* DELETE */}

                          <button

                            onClick={() =>
                              removeFile(index)
                            }

                            className="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center"

                          >

                            <FaTrash className="text-sm" />

                          </button>

                          {

                            file.type.startsWith("image")

                              ? (

                                <img

                                  src={URL.createObjectURL(file)}

                                  alt="preview"

                                  className="w-full h-[130px] object-cover rounded-xl"

                                />

                              )

                              : (

                                <video

                                  src={URL.createObjectURL(file)}

                                  className="w-full h-[130px] object-cover rounded-xl"

                                />

                              )

                          }

                          <p className="text-sm mt-2 truncate text-gray-500">

                            {file.name}

                          </p>

                        </div>

                      ))

                    }

                  </div>

                )

              }

              {/* BUTTON */}

              <button

                onClick={uploadMedia}

                className="mt-10 w-full bg-gradient-to-r from-[#7B2CBF] to-[#4361EE] text-white py-5 rounded-2xl text-lg font-bold shadow-xl hover:scale-[1.02] transition-all"

              >

                Upload Media

              </button>

            </div>

          </div>

        )

      }

      {/* COMMENT MODAL */}

      {
        showComments && (

          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[999] flex items-center justify-center px-4">

            <div className="w-full max-w-2xl bg-white rounded-[35px] shadow-2xl p-6 relative">

              {/* CLOSE */}

              <button

                onClick={() => {

                  setShowComments(false);

                  setSelectedMedia(null);

                }}

                className="absolute top-5 right-5 text-3xl text-gray-400 hover:text-red-500"

              >

                ×

              </button>

              {/* TITLE */}

              <h1 className="text-3xl font-black text-[#2d1457]">

                Comments

              </h1>

              {/* INPUT AREA */}

              <div className="flex gap-3 mt-6">

                <input

                  type="text"

                  value={commentText}

                  onChange={(e) =>
                    setCommentText(
                      e.target.value
                    )
                  }

                  placeholder="Write a comment..."

                  className="flex-1 bg-[#f8f5ff] rounded-2xl px-5 py-4 outline-none text-black"

                />

                <button

                  onClick={() => {

                    if (!selectedMedia)
                      return;

                    addComment(
                      selectedMedia._id
                    );

                  }}

                  className="bg-gradient-to-r from-[#7B2CBF] to-[#4361EE] text-white px-8 rounded-2xl"

                >

                  Post

                </button>

              </div>
              {/* COMMENTS LIST */}

              <div className="mt-8 flex flex-col gap-4 max-h-[400px] overflow-y-auto">

                {

                  media

                    .find(
                      item =>
                        item._id === selectedMedia?._id
                    )

                    ?.comments?.map(

                      (comment, index) => (

                        <div

                          key={index}

                          className="bg-[#f8f5ff] rounded-2xl p-4"

                        >

                          <h2 className="font-bold text-[#2d1457]">

                            {comment.user}

                          </h2>

                          <p className="text-gray-600 mt-1">

                            {comment.text}

                          </p>

                        </div>

                      )

                    )

                }

              </div>
            </div>

          </div>

        )
      },

      {/* SHARE MODAL */}

      {

        showShare && (

          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[999] flex items-center justify-center px-4">

            <div className="w-full max-w-md bg-white rounded-[35px] shadow-2xl p-8 relative">

              {/* CLOSE */}

              <button

                onClick={() =>
                  setShowShare(false)
                }

                className="absolute top-5 right-5 text-3xl text-gray-400 hover:text-red-500"

              >

                ×

              </button>

              {/* TITLE */}

              <h1 className="text-3xl font-black text-[#2d1457]">

                Share Post

              </h1>

              {/* BUTTONS */}

              <div className="grid grid-cols-2 gap-5 mt-8">

                {/* WHATSAPP */}

                <a

                  href={`https://wa.me/?text=${window.location.href}`}

                  target="_blank"

                  className="bg-green-500 text-white rounded-2xl py-5 text-center font-bold hover:scale-105 transition-all"

                >

                  WhatsApp

                </a>

                {/* TWITTER */}

                <a

                  href={`https://twitter.com/intent/tweet?url=${window.location.href}`}

                  target="_blank"

                  className="bg-black text-white rounded-2xl py-5 text-center font-bold hover:scale-105 transition-all"

                >

                  Twitter/X

                </a>

                {/* TELEGRAM */}

                <a

                  href={`https://t.me/share/url?url=${window.location.href}`}

                  target="_blank"

                  className="bg-blue-500 text-white rounded-2xl py-5 text-center font-bold hover:scale-105 transition-all"

                >

                  Telegram

                </a>

                {/* COPY */}

                <button

                  onClick={() => {

                    navigator.clipboard.writeText(

                      window.location.href

                    );

                  }}

                  className="bg-[#7B2CBF] text-white rounded-2xl py-5 font-bold hover:scale-105 transition-all"

                >

                  Copy Link

                </button>

              </div>

            </div>

          </div>

        )

      }

      {/* COLLECTION MODAL */}

      {

        showCollectionModal && (

          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[999] flex items-center justify-center px-4">

            <div className="w-full max-w-md bg-white rounded-[35px] shadow-2xl p-8 relative">

              {/* CLOSE */}

              <button

                onClick={() =>
                  setShowCollectionModal(false)
                }

                className="absolute top-5 right-5 text-3xl text-gray-400 hover:text-red-500"

              >

                ×

              </button>

              <h1 className="text-3xl font-black text-[#2d1457]">

                Save To Collection

              </h1>

              {/* CREATE */}

              <div className="flex gap-3 mt-6">

                <input

                  type="text"

                  value={newCollection}

                  onChange={(e) =>
                    setNewCollection(
                      e.target.value
                    )
                  }

                  placeholder="Create collection..."

                  className="flex-1 bg-[#f8f5ff] rounded-2xl px-5 py-4 outline-none text-black"

                />

                <button

                  onClick={createCollection}

                  className="bg-gradient-to-r from-[#7B2CBF] to-[#4361EE] text-white px-6 rounded-2xl"

                >

                  Create

                </button>

              </div>

            </div>

          </div>

        )

      }

    </div>

  );

};

export default EventDetails;
import { useState, useCallback } from "react";

import axios from "axios";

import toast from "react-hot-toast";

import { useDropzone } from "react-dropzone";

import imageCompression from "browser-image-compression";

import Navbar from "../components/Navbar";

import {

  FaCloudUploadAlt,
  FaTrash,
  FaImages,
  FaVideo

} from "react-icons/fa";

const Upload = () => {

  const [files, setFiles] = useState([]);

  const [visibility, setVisibility] =
    useState("Public");

  const [uploading, setUploading] =
    useState(false);

  const [progress, setProgress] =
    useState(0);

  const [selectedEvent, setSelectedEvent] =
    useState("Cultural Fest");

  const onDrop = useCallback(async (acceptedFiles) => {

    const processedFiles = [];

    for (let file of acceptedFiles) {

      // VALIDATION

      if (
        !file.type.startsWith("image/") &&
        !file.type.startsWith("video/")
      ) {

        toast.error(
          "Only images/videos allowed"
        );

        continue;
      }

      // IMAGE COMPRESSION

      if (file.type.startsWith("image/")) {

        const compressed =
          await imageCompression(
            file,
            {
              maxSizeMB: 1,
              maxWidthOrHeight: 1920,
              useWebWorker: true
            }
          );

        processedFiles.push(

          Object.assign(compressed, {

            preview:
              URL.createObjectURL(compressed)

          })

        );

      } else {

        processedFiles.push(

          Object.assign(file, {

            preview:
              URL.createObjectURL(file)

          })

        );

      }

    }

    setFiles((prev) => [

      ...prev,
      ...processedFiles

    ]);

  }, []);

  const {

    getRootProps,
    getInputProps

  } = useDropzone({

    onDrop,
    multiple: true

  });

  const removeFile = (index) => {

    const updated =
      [...files];

    updated.splice(index, 1);

    setFiles(updated);

  };

  const handleUpload = async () => {

    try {

      setUploading(true);

      for (const file of files) {

        const formData =
          new FormData();

        formData.append(
          "file",
          file
        );

        formData.append(
          "visibility",
          visibility
        );

        formData.append(
          "event",
          selectedEvent
        );

        await axios.post(

          `${import.meta.env.VITE_API_URL}/api/media/upload`,

          formData,

          {

            headers: {

              authorization:
                localStorage.getItem(
                  "token"
                )

            },

            onUploadProgress: (data) => {

              setProgress(

                Math.round(
                  (data.loaded * 100) /
                  data.total
                )

              );

            }

          }

        );

      }

      toast.success(
        "Media Uploaded Successfully 🚀"
      );

      setFiles([]);

      setProgress(0);

    } catch (error) {

      console.log(error);

      toast.error(
        "Upload Failed"
      );

    } finally {

      setUploading(false);

    }

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-[#f8f5ff] via-[#fcfbff] to-[#eef2ff]">

      <Navbar />

      <div className="max-w-6xl mx-auto px-6 md:px-10 py-12">

        {/* TITLE */}

        <div className="mb-12">

          <h1 className="text-5xl font-black text-[#2d1457]">

            Upload Event Media

          </h1>

          <p className="text-gray-500 text-lg mt-3">

            Upload photos/videos with AI tagging and event organization.

          </p>

        </div>

        {/* DROPZONE */}

        <div

          {...getRootProps()}

          className="border-2 border-dashed border-[#7B2CBF] bg-white rounded-[35px] h-[260px] flex flex-col justify-center items-center cursor-pointer shadow-lg hover:bg-[#faf7ff] transition-all"

        >

          <input {...getInputProps()} />

          <FaCloudUploadAlt className="text-6xl text-[#7B2CBF]" />

          <h2 className="text-2xl font-bold text-[#2d1457] mt-5">

            Drag & Drop Media Here

          </h2>

          <p className="text-gray-500 mt-2">

            Bulk upload supported

          </p>

        </div>

        {/* OPTIONS */}

        <div className="flex flex-col md:flex-row gap-6 mt-8">

          <select

            value={selectedEvent}

            onChange={(e) =>
              setSelectedEvent(
                e.target.value
              )
            }

            className="bg-white shadow-md px-5 py-4 rounded-2xl outline-none"

          >

            <option>Cultural Fest</option>

            <option>Hackathon</option>

            <option>Photography Walk</option>

          </select>

          <select

            value={visibility}

            onChange={(e) =>
              setVisibility(
                e.target.value
              )
            }

            className="bg-white shadow-md px-5 py-4 rounded-2xl outline-none"

          >

            <option>Public</option>

            <option>Private</option>

          </select>

        </div>

        {/* PREVIEW */}

        {files.length > 0 && (

          <div className="mt-14">

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-3xl font-black text-[#2d1457]">

                Media Preview

              </h2>

              <span className="text-gray-500">

                {files.length} Files Selected

              </span>

            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

              {files.map((file, index) => (

                <div

                  key={index}

                  className="bg-white rounded-[25px] overflow-hidden shadow-lg relative"

                >

                  {/* IMAGE */}

                  {file.type.startsWith("image") ? (

                    <img

                      src={file.preview}

                      className="w-full h-[220px] object-cover"

                    />

                  ) : (

                    <video

                      src={file.preview}

                      className="w-full h-[220px] object-cover"

                    />

                  )}

                  {/* REMOVE */}

                  <button

                    onClick={() =>
                      removeFile(index)
                    }

                    className="absolute top-3 right-3 bg-red-500 text-white w-10 h-10 rounded-full flex items-center justify-center"

                  >

                    <FaTrash />

                  </button>

                  {/* TYPE */}

                  <div className="p-4 flex items-center gap-3">

                    {file.type.startsWith("image") ? (

                      <FaImages className="text-[#7B2CBF]" />

                    ) : (

                      <FaVideo className="text-[#4361EE]" />

                    )}

                    <p className="text-sm truncate">

                      {file.name}

                    </p>

                  </div>

                </div>

              ))}

            </div>

          </div>

        )}

        {/* PROGRESS */}

        {uploading && (

          <div className="mt-10">

            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">

              <div

                style={{
                  width: `${progress}%`
                }}

                className="h-full bg-gradient-to-r from-[#7B2CBF] to-[#4361EE] transition-all"

              />

            </div>

            <p className="text-center mt-3 text-gray-500">

              Uploading... {progress}%

            </p>

          </div>

        )}

        {/* BUTTON */}

        <button

          onClick={handleUpload}

          disabled={uploading}

          className="mt-12 bg-gradient-to-r from-[#7B2CBF] to-[#4361EE] text-white px-10 py-4 rounded-2xl shadow-xl hover:scale-105 transition-all text-xl font-bold"

        >

          {uploading
            ? "Uploading..."
            : "Upload Media"}

        </button>

      </div>

    </div>

  );

};

export default Upload;
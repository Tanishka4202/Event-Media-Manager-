import { useState, useCallback } from "react";

import axios from "axios";

import toast from "react-hot-toast";

import { useDropzone } from "react-dropzone";

import Navbar from "../components/Navbar";

const Upload = () => {

    const [files, setFiles] = useState([]);

    const [preview, setPreview] = useState(null);

    const [visibility, setVisibility] =
        useState("Public");

    const onDrop = useCallback((acceptedFiles) => {

        const selectedFile = acceptedFiles[0];

        setFiles(acceptedFiles);

        setPreview(
            URL.createObjectURL(selectedFile)
        );

    }, []);

    const {
        getRootProps,
        getInputProps
    } = useDropzone({
        onDrop
    });

    const handleUpload = async () => {

        for (const file of files) {

    const formData =
        new FormData();

    formData.append("file", file);

    formData.append(
        "visibility",
        visibility
    );

    await axios.post(

        "http://localhost:5000/api/media/upload",

        formData,

        {

            headers: {

                authorization:
                    localStorage.getItem(
                        "token"
                    )

            }

        }

    );

}

    };

    return (

        <div className="min-h-screen bg-black">

            <Navbar />

            <div className="flex flex-col items-center p-10">

                <h1 className="text-6xl font-black text-green-400 mb-10">
                    AI Media Upload
                </h1>

                {/* DROPZONE */}

                <div
                    {...getRootProps()}
                    className="border-2 border-dashed border-green-500 w-full max-w-2xl h-[300px] rounded-3xl flex flex-col items-center justify-center cursor-pointer bg-slate-900 hover:bg-slate-800 transition"
                >

                    <input {...getInputProps()} />

                    <p className="text-2xl text-white">
                        Drag & Drop Media Here
                    </p>

                    <p className="text-gray-400 mt-3">
                        AI will auto-tag your uploads
                    </p>

                </div>

                {/* VISIBILITY */}

                <select
                    value={visibility}
                    onChange={(e) =>
                        setVisibility(
                            e.target.value
                        )
                    }
                    className="mt-6 bg-slate-900 text-white p-4 rounded-xl"
                >

                    <option>Public</option>

                    <option>Private</option>

                </select>

                {/* PREVIEW */}

                {preview && (

                    <div className="grid md:grid-cols-3 gap-6 mt-10">

                        {files.map((file, index) => (

                            <img
                                key={index}
                                src={URL.createObjectURL(file)}
                                className="w-[250px] rounded-3xl"
                            />

                        ))}

                    </div>

                )}

                {/* BUTTON */}

                <button
                    onClick={handleUpload}
                    className="mt-10 bg-green-500 hover:bg-green-600 px-10 py-4 rounded-2xl text-2xl text-white"
                >
                    Upload with AI
                </button>

            </div>

        </div>

    );

};

export default Upload;
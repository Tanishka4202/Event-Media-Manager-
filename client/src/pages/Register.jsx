import { useState } from "react";

import axios from "axios";

import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";

const Register = () => {

    const navigate = useNavigate();

    const [name, setName] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const handleRegister = async () => {

        try {

            // EMAIL VALIDATION

            const emailRegex =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(email)) {

                toast.error(
                    "Invalid email format"
                );

                return;

            }

            const res = await axios.post(

                "http://localhost:5000/api/auth/register",

                {
                    name,
                    email,
                    password
                }

            );

            toast.success(
                "Registration Successful 🚀"
            );

            localStorage.setItem(
                "token",
                res.data.token
            );

            navigate("/gallery");

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message ||

                "Registration Failed"
            );

        }

    };

    return (

        <div className="min-h-screen bg-black flex items-center justify-center">

            <div className="bg-slate-900 p-10 rounded-3xl w-[400px]">

                <h1 className="text-5xl font-black text-green-400 mb-10 text-center">

                    Register

                </h1>

                {/* NAME */}

                <input
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) =>
                        setName(
                            e.target.value
                        )
                    }
                    className="w-full p-4 rounded-xl bg-slate-800 text-white outline-none mb-6"
                />

                {/* EMAIL */}

                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(
                            e.target.value
                        )
                    }
                    className="w-full p-4 rounded-xl bg-slate-800 text-white outline-none mb-6"
                />

                {/* PASSWORD */}

                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(
                            e.target.value
                        )
                    }
                    className="w-full p-4 rounded-xl bg-slate-800 text-white outline-none mb-6"
                />

                {/* BUTTON */}

                <button
                    onClick={handleRegister}
                    className="w-full bg-green-500 hover:bg-green-600 p-4 rounded-xl text-white text-xl"
                >
                    Register
                </button>

            </div>

        </div>

    );

};

export default Register;
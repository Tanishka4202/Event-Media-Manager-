import { useState } from "react";

import axios from "axios";

import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";

import {

  FaUserAlt,

  FaEnvelope,

  FaLock,

  FaGoogle,

  FaInstagram

} from "react-icons/fa";

const Login = () => {

  const navigate = useNavigate();

  const [isSignup, setIsSignup] =
    useState(false);

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

    const [role, setRole] =
  useState("viewer");

const handleAuth = async () => {

  try {

    const url = isSignup

      ? `${import.meta.env.VITE_API_URL}/api/auth/register`

      : `${import.meta.env.VITE_API_URL}/api/auth/login`;

    // FIXED PAYLOAD

    const payload = isSignup

      ? {

          name,
          email,
          password,
          role

        }

      : {

          email,
          password

        };

    const res =
      await axios.post(
        url,
        payload
      );

    // SAVE TOKEN

    localStorage.setItem(
      "token",
      res.data.token
    );

    // SAVE USER

    localStorage.setItem(

      "user",

      JSON.stringify(
        res.data.user
      )

    );

    toast.success(

      isSignup
        ? "Account Created 🚀"
        : "Login Successful 🚀"

    );

    navigate("/events");

  }

  catch (error) {

    console.log(error);

    toast.error(

      error.response?.data?.message ||

      "Authentication Failed"

    );

  }

};

  return (

    <div className="min-h-screen bg-gradient-to-br from-[#18001f] via-[#3a015c] to-[#140024] flex items-center justify-center px-4 py-8 overflow-hidden">

      {/* CARD */}

      <div className="w-full max-w-6xl bg-white rounded-[30px] overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.4)] flex flex-col md:flex-row">

        {/* LEFT SIDE */}

        <div className="hidden md:flex w-[40%] relative overflow-hidden bg-gradient-to-br from-[#5B0E8B] via-[#7B2CBF] to-[#4361EE] min-h-[650px]">

          {/* GEOMETRIC SHAPES */}

          <div className="absolute w-[450px] h-[450px] bg-white/10 rotate-45 top-[-200px] left-[-100px]" />

          <div className="absolute w-[300px] h-[300px] bg-white/10 rotate-45 bottom-[-120px] left-[50px]" />

          <div className="absolute w-[250px] h-[250px] bg-white/5 rotate-45 top-[180px] left-[-100px]" />

          {/* TABS */}

          <div className="relative z-10 flex flex-col justify-center items-center w-full gap-6">

            <button
              onClick={() =>
                setIsSignup(false)
              }
              className={`

                px-10
                py-4
                rounded-full
                font-bold
                transition-all
                duration-300
                hover:scale-105

                ${!isSignup

                  ? "bg-white text-[#5B0E8B] shadow-2xl"

                  : "text-white"}

              `}
            >

              LOGIN

            </button>

            <button
              onClick={() =>
                setIsSignup(true)
              }
              className={`

                px-10
                py-4
                rounded-full
                font-bold
                transition-all
                duration-300
                hover:scale-105

                ${isSignup

                  ? "bg-white text-[#5B0E8B] shadow-2xl"

                  : "text-white"}

              `}
            >

              SIGN UP

            </button>

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="w-full md:w-[60%] flex flex-col items-center justify-center px-8 md:px-20 py-10 transition-all duration-500">

          {/* ICON */}

          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#7B2CBF] to-[#4361EE] flex items-center justify-center shadow-2xl">

            <FaUserAlt className="text-white text-4xl" />

          </div>

          {/* TITLE */}

          <h1 className="mt-5 text-4xl md:text-5xl font-black text-[#5B0E8B] transition-all duration-300">

            {isSignup
              ? "SIGN UP"
              : "LOGIN"}

          </h1>

          {/* NAME */}

         {

  isSignup && (

    <select

      value={role}

      onChange={(e)=>
        setRole(e.target.value)
      }

      className="w-full mt-6 border-b border-gray-300 py-3 outline-none text-black bg-transparent"

    >

      <option value="viewer">

        Viewer

      </option>

      <option value="member">

        Club Member

      </option>

      <option value="photographer">

        Photographer

      </option>

      <option value="admin">

        Admin

      </option>

    </select>

  )

}

          {/* EMAIL */}

          <div className="w-full mt-6 border-b border-gray-300 flex items-center gap-4 py-3 transition-all">

            <FaEnvelope className="text-gray-400" />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              className="w-full outline-none text-black placeholder-gray-400 bg-transparent"
            />

          </div>

          {/* PASSWORD */}

          <div className="w-full mt-6 border-b border-gray-300 flex items-center gap-4 py-3 transition-all">

            <FaLock className="text-gray-400" />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              className="w-full outline-none text-black placeholder-gray-400 bg-transparent"
            />

          </div>

          {/* FORGOT */}

          <p className="w-full text-left mt-3 text-sm text-gray-400 hover:text-[#7B2CBF] cursor-pointer transition-all">

            Forgot Password?

          </p>

          <select

  value={role}

  onChange={(e)=>
    setRole(e.target.value)
  }

  className="w-full mt-6 border-b border-gray-300 py-3 outline-none text-black"

>

  <option value="viewer">

    Viewer

  </option>

  <option value="member">

    Club Member

  </option>

  <option value="photographer">

    Photographer

  </option>

</select>

          {/* BUTTON */}

          <button
            onClick={handleAuth}
            className="mt-8 px-16 py-4 rounded-full bg-gradient-to-r from-[#7B2CBF] to-[#4361EE] text-white font-bold shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300"
          >

            {isSignup
              ? "SIGN UP"
              : "LOGIN"}

          </button>

          {/* SOCIAL */}

          <div className="mt-12 flex flex-col items-center">

            <p className="text-gray-500">

              Or Login With

            </p>

            <div className="flex flex-wrap justify-center gap-5 mt-6">

              {/* GOOGLE */}

              <div

                onClick={() =>
                  window.open(
                    "https://accounts.google.com",
                    "_blank"
                  )
                }

                className="flex items-center gap-3 px-5 py-3 rounded-full border border-gray-200 shadow-sm cursor-pointer text-gray-600 hover:bg-[#f3ebff] hover:text-[#7B2CBF] transition-all duration-300"

              >

                <FaGoogle />

                Google

              </div>

              {/* INSTAGRAM */}

              <div

                onClick={() =>
                  window.open(
                    "https://instagram.com",
                    "_blank"
                  )
                }

                className="flex items-center gap-3 px-5 py-3 rounded-full border border-gray-200 shadow-sm cursor-pointer text-gray-600 hover:bg-[#f3ebff] hover:text-[#7B2CBF] transition-all duration-300"

              >

                <FaInstagram />

                Instagram

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

};

export default Login;
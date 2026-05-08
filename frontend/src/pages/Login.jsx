import { useDispatch } from "react-redux";

import {
  loginUser
} from "../features/auth/authSlice";

import { useState } from "react";

import {
  useNavigate,
  Link
} from "react-router-dom";

import toast from "react-hot-toast";


export default function Login() {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] = useState({

    username: "",

    password: "",
  });


  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    const res = await dispatch(
      loginUser(form)
    );

    setLoading(false);

    if (
      res.meta.requestStatus ===
      "fulfilled"
    ) {

      const user = res.payload;

      toast.success(
        `Welcome back ${user.username}`
      );

      if (user.is_vendor) {

        navigate("/vendor");

      } else {

        navigate("/");
      }

    } else {

      toast.error(
        "Invalid credentials"
      );
    }
  };


  return (

    <div

      className="

        min-h-screen

        bg-gradient-to-br

        from-black

        via-gray-900

        to-gray-950

        flex

        items-center

        justify-center

        px-4
      "
    >

      <div

        className="

          w-full

          max-w-md

          bg-white/10

          backdrop-blur-xl

          border

          border-white/10

          rounded-3xl

          shadow-2xl

          p-8
        "
      >

        {/* HEADER */}
        <div className="text-center mb-8">

          <h1

            className="

              text-4xl

              font-bold

              text-white
            "
          >
            Welcome Back
          </h1>

          <p

            className="

              text-gray-400

              mt-2
            "
          >
            Login to continue shopping
          </p>

        </div>


        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* USERNAME */}
          <div>

            <label

              className="

                text-sm

                text-gray-300

                block

                mb-2
              "
            >
              Username
            </label>

            <input

              type="text"

              placeholder="Enter username"

              className="

                w-full

                bg-black/30

                border

                border-gray-700

                text-white

                rounded-xl

                px-4

                py-3

                outline-none

                focus:ring-2

                focus:ring-white

                transition
              "

              onChange={(e) =>

                setForm({

                  ...form,

                  username:
                    e.target.value,
                })
              }
            />

          </div>


          {/* PASSWORD */}
          <div>

            <label

              className="

                text-sm

                text-gray-300

                block

                mb-2
              "
            >
              Password
            </label>

            <input

              type="password"

              placeholder="Enter password"

              className="

                w-full

                bg-black/30

                border

                border-gray-700

                text-white

                rounded-xl

                px-4

                py-3

                outline-none

                focus:ring-2

                focus:ring-white

                transition
              "

              onChange={(e) =>

                setForm({

                  ...form,

                  password:
                    e.target.value,
                })
              }
            />

          </div>


          {/* LOGIN BUTTON */}
          <button

            disabled={loading}

            className="

              w-full

              bg-white

              text-black

              font-semibold

              py-3

              rounded-xl

              hover:scale-[1.02]

              transition-all

              duration-300

              disabled:opacity-50
            "
          >

            {
              loading

                ? "Logging in..."

                : "Login"
            }

          </button>

        </form>


        {/* REGISTER LINK */}
        <p

          className="

            text-center

            text-gray-400

            mt-6
          "
        >

          Don’t have an account?

          {" "}

          <Link

            to="/register"

            className="

              text-white

              font-semibold

              hover:underline
            "
          >
            Register
          </Link>

        </p>

      </div>

    </div>
  );
}
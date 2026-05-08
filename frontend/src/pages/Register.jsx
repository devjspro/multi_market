import { useState } from "react";

import { useDispatch } from "react-redux";

import {
  registerUser
} from "../features/auth/authSlice";

import {
  useNavigate,
  Link
} from "react-router-dom";

import toast from "react-hot-toast";


export default function Register() {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] = useState({

    username: "",

    email: "",

    password: "",

    is_vendor: false,
  });


  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    const res = await dispatch(
      registerUser(form)
    );

    setLoading(false);

    if (
      res.meta.requestStatus ===
      "fulfilled"
    ) {

      toast.success(
        "Registered successfully!"
      );

      navigate("/login");

    } else {

      console.error(res.payload);

      toast.error(
        "Registration failed"
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

        {/* HEADING */}
        <div className="text-center mb-8">

          <h1

            className="

              text-4xl

              font-bold

              text-white
            "
          >
            Create Account
          </h1>

          <p

            className="

              text-gray-400

              mt-2
            "
          >
            Join the marketplace today
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


          {/* EMAIL */}
          <div>

            <label
              className="
                text-sm
                text-gray-300
                block
                mb-2
              "
            >
              Email
            </label>

            <input

              type="email"

              placeholder="Enter email"

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

                  email:
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


          {/* VENDOR CHECKBOX */}
          <label

            className="

              flex

              items-center

              gap-3

              text-gray-300

              cursor-pointer
            "
          >

            <input

              type="checkbox"

              className="
                w-4
                h-4
              "

              onChange={(e) =>

                setForm({

                  ...form,

                  is_vendor:
                    e.target.checked,
                })
              }
            />

            Register as Vendor

          </label>


          {/* BUTTON */}
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

                ? "Creating Account..."

                : "Register"
            }

          </button>

        </form>


        {/* LOGIN LINK */}
        <p

          className="

            text-center

            text-gray-400

            mt-6
          "
        >

          Already have an account?

          {" "}

          <Link

            to="/login"

            className="

              text-white

              font-semibold

              hover:underline
            "
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}
import {
  Link,
  useNavigate
} from "react-router-dom";

import {
  useDispatch,
  useSelector
} from "react-redux";

import {
  logout
} from "../features/auth/authSlice";

import toast from "react-hot-toast";

import {
  ShoppingCart,
  LayoutDashboard,
  Package,
  LogOut,
  User,
  Store
} from "lucide-react";


export default function Navbar() {

  const {
    user,
    isAuthenticated
  } = useSelector(
    (s) => s.auth
  );

  const dispatch = useDispatch();

  const navigate = useNavigate();


  const handleLogout = () => {

    dispatch(logout());

    toast.success(
      "Logged out successfully"
    );

    navigate("/login");
  };


  return (

    <nav

      className="

        sticky

        top-0

        z-50

        backdrop-blur-xl

        bg-black/70

        border-b

        border-white/10

        px-6

        py-4
      "
    >

      <div

        className="

          max-w-7xl

          mx-auto

          flex

          items-center

          justify-between
        "
      >

        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center gap-2"
        >

          <Store
            className="text-white"
            size={28}
          />

          <h1

            className="

              text-2xl

              font-bold

              text-white
            "
          >
            MarketPlace
          </h1>

        </Link>


        {/* LINKS */}
        <div

          className="

            flex

            items-center

            gap-5
          "
        >

          {/* NOT LOGGED IN */}
          {
            !isAuthenticated && (

              <>

                <Link

                  to="/login"

                  className="

                    text-gray-300

                    hover:text-white

                    transition
                  "
                >
                  Login
                </Link>

                <Link

                  to="/register"

                  className="

                    bg-white

                    text-black

                    px-5

                    py-2

                    rounded-xl

                    font-semibold

                    hover:scale-105

                    transition
                  "
                >
                  Register
                </Link>

              </>
            )
          }


          {/* LOGGED IN */}
          {
            isAuthenticated && (

              <>

                {/* USER */}
                <div

                  className="

                    hidden

                    md:flex

                    items-center

                    gap-2

                    text-gray-300
                  "
                >

                  <User size={18} />

                  <span>
                    {user?.username}
                  </span>

                </div>


                {/* VENDOR */}
                {
                  user?.is_vendor && (

                    <Link

                      to="/vendor"

                      className="

                        flex

                        items-center

                        gap-2

                        text-gray-300

                        hover:text-white

                        transition
                      "
                    >

                      <LayoutDashboard
                        size={18}
                      />

                      <span>
                        Vendor
                      </span>

                    </Link>
                  )
                }


                {/* CART */}
                <Link

                  to="/cart"

                  className="

                    flex

                    items-center

                    gap-2

                    text-gray-300

                    hover:text-white

                    transition
                  "
                >

                  <ShoppingCart
                    size={18}
                  />

                  <span>
                    Cart
                  </span>

                </Link>


                {/* ORDERS */}
                <Link

                  to="/orders"

                  className="

                    flex

                    items-center

                    gap-2

                    text-gray-300

                    hover:text-white

                    transition
                  "
                >

                  <Package
                    size={18}
                  />

                  <span>
                    Orders
                  </span>

                </Link>


                {/* LOGOUT */}
                <button

                  onClick={handleLogout}

                  className="

                    flex

                    items-center

                    gap-2

                    bg-red-500

                    hover:bg-red-600

                    text-white

                    px-4

                    py-2

                    rounded-xl

                    transition
                  "
                >

                  <LogOut
                    size={18}
                  />

                  Logout

                </button>

              </>
            )
          }

        </div>

      </div>

    </nav>
  );
}
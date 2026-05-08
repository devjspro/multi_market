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
  Store,
  Menu,
  X
} from "lucide-react";

import {
  useState
} from "react";


export default function Navbar() {

  const {
    user,
    isAuthenticated
  } = useSelector(
    (s) => s.auth
  );

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [mobileMenu, setMobileMenu] =
    useState(false);


  const handleLogout = () => {

    dispatch(logout());

    toast.success(
      "Logged out successfully"
    );

    navigate("/login");

    setMobileMenu(false);
  };


  return (

    <nav

      className="

        sticky

        top-0

        z-50

        backdrop-blur-xl

        bg-black/80

        border-b

        border-white/10
      "
    >

      <div

        className="

          max-w-7xl

          mx-auto

          px-4

          py-4

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

              text-xl

              md:text-2xl

              font-bold

              text-white
            "
          >
            MarketPlace
          </h1>

        </Link>


        {/* DESKTOP MENU */}
        <div

          className="

            hidden

            md:flex

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

                    flex

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


                {/* VENDOR DASHBOARD */}
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

                      Vendor

                    </Link>
                  )
                }


                {/* SHOW ONLY FOR NORMAL USERS */}
                {
                  !user?.is_vendor && (

                    <>

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

                        Cart

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

                        Orders

                      </Link>

                    </>
                  )
                }


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


        {/* MOBILE MENU BUTTON */}
        <button

          onClick={() =>
            setMobileMenu(
              !mobileMenu
            )
          }

          className="

            md:hidden

            text-white
          "
        >

          {
            mobileMenu
              ? <X size={28} />
              : <Menu size={28} />
          }

        </button>

      </div>


      {/* MOBILE MENU */}
      {
        mobileMenu && (

          <div

            className="

              md:hidden

              px-4

              pb-5

              flex

              flex-col

              gap-4

              bg-black/95

              border-t

              border-white/10
            "
          >

            {/* NOT LOGGED */}
            {
              !isAuthenticated && (

                <>

                  <Link

                    to="/login"

                    onClick={() =>
                      setMobileMenu(false)
                    }

                    className="text-gray-300"
                  >
                    Login
                  </Link>

                  <Link

                    to="/register"

                    onClick={() =>
                      setMobileMenu(false)
                    }

                    className="

                      bg-white

                      text-black

                      px-4

                      py-2

                      rounded-xl

                      text-center

                      font-semibold
                    "
                  >
                    Register
                  </Link>

                </>
              )
            }


            {/* LOGGED */}
            {
              isAuthenticated && (

                <>

                  <div

                    className="

                      flex

                      items-center

                      gap-2

                      text-gray-300
                    "
                  >

                    <User size={18} />

                    {user?.username}

                  </div>


                  {/* VENDOR */}
                  {
                    user?.is_vendor && (

                      <Link

                        to="/vendor"

                        onClick={() =>
                          setMobileMenu(false)
                        }

                        className="

                          flex

                          items-center

                          gap-2

                          text-gray-300
                        "
                      >

                        <LayoutDashboard
                          size={18}
                        />

                        Vendor Dashboard

                      </Link>
                    )
                  }


                  {/* NORMAL USER ONLY */}
                  {
                    !user?.is_vendor && (

                      <>

                        <Link

                          to="/cart"

                          onClick={() =>
                            setMobileMenu(false)
                          }

                          className="

                            flex

                            items-center

                            gap-2

                            text-gray-300
                          "
                        >

                          <ShoppingCart
                            size={18}
                          />

                          Cart

                        </Link>


                        <Link

                          to="/orders"

                          onClick={() =>
                            setMobileMenu(false)
                          }

                          className="

                            flex

                            items-center

                            gap-2

                            text-gray-300
                          "
                        >

                          <Package
                            size={18}
                          />

                          Orders

                        </Link>

                      </>
                    )
                  }


                  {/* LOGOUT */}
                  <button

                    onClick={handleLogout}

                    className="

                      flex

                      items-center

                      justify-center

                      gap-2

                      bg-red-500

                      hover:bg-red-600

                      text-white

                      px-4

                      py-3

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
        )
      }

    </nav>
  );
}
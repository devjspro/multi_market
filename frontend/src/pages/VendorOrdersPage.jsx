import {
  useEffect,
  useState
} from "react";

import API from "../services/api";

import toast from "react-hot-toast";

import {
  ShoppingBag,
  PackageCheck,
  Clock3,
  Truck,
  CheckCircle2,
  XCircle
} from "lucide-react";


const fallback =
  "https://via.placeholder.com/300x300?text=No+Image";


export default function VendorOrdersPage() {

  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);


  // FETCH ORDERS
  const fetchOrders = async () => {

    try {

      const res = await API.get(
        "/orders/vendor/"
      );

      setOrders(res.data);

    } catch (err) {

      console.error(err);

      toast.error(
        "Failed to fetch orders"
      );

    } finally {

      setLoading(false);
    }
  };


  useEffect(() => {

    fetchOrders();

  }, []);


  // UPDATE STATUS
  const updateStatus = async (
    id,
    status
  ) => {

    try {

      await API.patch(

        `/orders/vendor/${id}/status/`,

        {
          status
        }
      );

      setOrders(

        orders.map((item) =>

          item.id === id

            ? {
                ...item,
                status
              }

            : item
        )
      );

      toast.success(
        "Order status updated"
      );

    } catch (err) {

      console.error(err);

      toast.error(
        "Failed to update status"
      );
    }
  };


  // STATUS COLORS
  const getStatusStyle = (
    status
  ) => {

    switch (status) {

      case "pending":

        return `
          bg-yellow-500/20
          text-yellow-300
          border-yellow-500/20
        `;

      case "processing":

        return `
          bg-blue-500/20
          text-blue-300
          border-blue-500/20
        `;

      case "shipped":

        return `
          bg-purple-500/20
          text-purple-300
          border-purple-500/20
        `;

      case "delivered":

        return `
          bg-green-500/20
          text-green-300
          border-green-500/20
        `;

      case "cancelled":

        return `
          bg-red-500/20
          text-red-300
          border-red-500/20
        `;

      default:

        return `
          bg-gray-500/20
          text-gray-300
          border-gray-500/20
        `;
    }
  };


  // STATUS ICON
  const getStatusIcon = (
    status
  ) => {

    switch (status) {

      case "pending":
        return <Clock3 size={18} />;

      case "processing":
        return <PackageCheck size={18} />;

      case "shipped":
        return <Truck size={18} />;

      case "delivered":
        return (
          <CheckCircle2 size={18} />
        );

      case "cancelled":
        return <XCircle size={18} />;

      default:
        return (
          <ShoppingBag size={18} />
        );
    }
  };


  if (loading) {

    return (

      <div

        className="

          min-h-screen

          bg-black

          text-white

          flex

          items-center

          justify-center
        "
      >

        <h2
          className="text-2xl"
        >
          Loading Orders...
        </h2>

      </div>
    );
  }


  return (

    <div

      className="

        min-h-screen

        bg-gradient-to-br

        from-black

        via-gray-950

        to-black

        text-white

        px-6

        py-10
      "
    >

      <div
        className="max-w-7xl mx-auto"
      >

        {/* HEADER */}
        <div className="mb-10">

          <h1

            className="

              text-5xl

              font-bold
            "
          >
            Vendor Orders
          </h1>

          <p

            className="

              text-gray-400

              mt-3
            "
          >
            Track and manage
            customer orders.
          </p>

        </div>


        {/* EMPTY */}
        {
          orders.length === 0 && (

            <div

              className="

                bg-white/5

                border

                border-white/10

                rounded-3xl

                py-24

                text-center
              "
            >

              <ShoppingBag

                size={70}

                className="
                  mx-auto
                  text-gray-500
                  mb-5
                "
              />

              <h2

                className="

                  text-3xl

                  font-bold
                "
              >
                No Orders Yet
              </h2>

              <p
                className="
                  text-gray-400
                  mt-3
                "
              >
                Orders from customers
                will appear here.
              </p>

            </div>
          )
        }


        {/* ORDERS */}
        <div className="space-y-8">

          {
            orders.map((item) => (

              <div

                key={item.id}

                className="

                  bg-white/5

                  border

                  border-white/10

                  rounded-3xl

                  p-6

                  backdrop-blur-xl

                  flex

                  flex-col

                  lg:flex-row

                  gap-6

                  hover:border-white/20

                  transition
                "
              >

                {/* IMAGE */}
                <img

                  src={
                    item.product_image ||
                    fallback
                  }

                  alt={
                    item.product_name
                  }

                  className="

                    w-full

                    lg:w-52

                    h-52

                    object-cover

                    rounded-2xl
                  "
                />


                {/* INFO */}
                <div className="flex-1">

                  <div

                    className="

                      flex

                      flex-col

                      lg:flex-row

                      lg:items-center

                      lg:justify-between

                      gap-4
                    "
                  >

                    <div>

                      <h2

                        className="

                          text-3xl

                          font-bold
                        "
                      >
                        {
                          item.product_name
                        }
                      </h2>

                      <p

                        className="

                          text-gray-400

                          mt-2
                        "
                      >
                        Order Item ID:
                        {" "}
                        #{item.id}
                      </p>

                    </div>


                    {/* STATUS BADGE */}
                    <div

                      className={`

                        flex

                        items-center

                        gap-2

                        px-4

                        py-2

                        rounded-2xl

                        border

                        w-fit

                        ${getStatusStyle(
                          item.status
                        )}

                      `}
                    >

                      {
                        getStatusIcon(
                          item.status
                        )
                      }

                      <span
                        className="
                          capitalize
                          font-medium
                        "
                      >
                        {item.status}
                      </span>

                    </div>

                  </div>


                  {/* DETAILS */}
                  <div

                    className="

                      grid

                      grid-cols-2

                      md:grid-cols-4

                      gap-6

                      mt-8
                    "
                  >

                    <div>

                      <p
                        className="
                          text-gray-400
                          text-sm
                        "
                      >
                        Quantity
                      </p>

                      <h3
                        className="
                          text-2xl
                          font-bold
                        "
                      >
                        {item.quantity}
                      </h3>

                    </div>


                    <div>

                      <p
                        className="
                          text-gray-400
                          text-sm
                        "
                      >
                        Price
                      </p>

                      <h3
                        className="
                          text-2xl
                          font-bold
                        "
                      >
                        ₹ {item.price}
                      </h3>

                    </div>


                    <div>

                      <p
                        className="
                          text-gray-400
                          text-sm
                        "
                      >
                        Total
                      </p>

                      <h3
                        className="
                          text-2xl
                          font-bold
                        "
                      >

                        ₹

                        {" "}

                        {
                          Number(
                            item.price
                          ) *
                          item.quantity
                        }

                      </h3>

                    </div>

                  </div>


                  {/* STATUS SELECT */}
                  <div className="mt-8">

                    <label

                      className="

                        block

                        text-sm

                        text-gray-400

                        mb-3
                      "
                    >
                      Update Status
                    </label>

                    <select

                      value={item.status}

                      onChange={(e) =>

                        updateStatus(

                          item.id,

                          e.target.value
                        )
                      }

                      className="

                        bg-black/40

                        border

                        border-white/10

                        rounded-2xl

                        px-5

                        py-3

                        outline-none

                        focus:border-white/30

                        transition
                      "
                    >

                      <option value="pending">
                        Pending
                      </option>

                      <option value="processing">
                        Processing
                      </option>

                      <option value="shipped">
                        Shipped
                      </option>

                      <option value="delivered">
                        Delivered
                      </option>

                      <option value="cancelled">
                        Cancelled
                      </option>

                    </select>

                  </div>

                </div>

              </div>
            ))
          }

        </div>

      </div>

    </div>
  );
}
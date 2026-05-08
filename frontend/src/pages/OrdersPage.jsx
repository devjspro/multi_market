import {
  useEffect,
  useState
} from "react";

import API from "../services/api";

import toast from "react-hot-toast";

import {
  ShoppingBag,
  Package,
  Clock3,
  Truck,
  CheckCircle2,
  XCircle,
  Loader2
} from "lucide-react";


const fallback =
  "https://via.placeholder.com/300x300?text=No+Image";


export default function OrdersPage() {

  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);


  // FETCH ORDERS
  const fetchOrders = async () => {

    try {

      const res = await API.get(
        "/orders/"
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


  // STATUS STYLES
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
        return <Clock3 size={16} />;

      case "processing":
        return <Loader2 size={16} />;

      case "shipped":
        return <Truck size={16} />;

      case "delivered":
        return (
          <CheckCircle2 size={16} />
        );

      case "cancelled":
        return <XCircle size={16} />;

      default:
        return <Package size={16} />;
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
            My Orders
          </h1>

          <p

            className="

              text-gray-400

              mt-3
            "
          >
            Track your purchases and
            delivery updates.
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
                  mb-5
                  text-gray-500
                "
              />

              <h2

                className="

                  text-3xl

                  font-bold
                "
              >
                No Orders Found
              </h2>

              <p

                className="

                  text-gray-400

                  mt-3
                "
              >
                Your orders will appear
                here after checkout.
              </p>

            </div>
          )
        }


        {/* ORDERS */}
        <div className="space-y-10">

          {
            orders.map((order) => (

              <div

                key={order.id}

                className="

                  bg-white/5

                  border

                  border-white/10

                  rounded-3xl

                  p-8

                  backdrop-blur-xl
                "
              >

                {/* ORDER HEADER */}
                <div

                  className="

                    flex

                    flex-col

                    lg:flex-row

                    lg:items-center

                    lg:justify-between

                    gap-5

                    pb-6

                    border-b

                    border-white/10
                  "
                >

                  <div>

                    <h2

                      className="

                        text-3xl

                        font-bold
                      "
                    >

                      Order #{order.id}

                    </h2>

                    <p

                      className="

                        text-gray-400

                        mt-2
                      "
                    >

                      {
                        new Date(
                          order.created_at
                        ).toLocaleString()
                      }

                    </p>

                  </div>


                  <div>

                    <p
                      className="
                        text-gray-400
                        text-sm
                      "
                    >
                      Total Amount
                    </p>

                    <h2

                      className="

                        text-4xl

                        font-bold
                      "
                    >

                      ₹ {order.total_price}

                    </h2>

                  </div>

                </div>


                {/* ITEMS */}
                <div className="mt-8 space-y-6">

                  {
                    order.items.map(

                      (item) => (

                        <div

                          key={item.id}

                          className="

                            bg-black/30

                            border

                            border-white/10

                            rounded-3xl

                            p-5

                            flex

                            flex-col

                            md:flex-row

                            gap-6
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

                              md:w-40

                              h-40

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

                                lg:items-start

                                lg:justify-between

                                gap-4
                              "
                            >

                              <div>

                                <h3

                                  className="

                                    text-2xl

                                    font-bold
                                  "
                                >
                                  {
                                    item.product_name
                                  }
                                </h3>

                                <p

                                  className="

                                    text-gray-400

                                    mt-2
                                  "
                                >
                                  Quantity:
                                  {" "}
                                  {
                                    item.quantity
                                  }
                                </p>

                              </div>


                              {/* STATUS */}
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

                                  capitalize

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

                                <span>

                                  {item.status}

                                </span>

                              </div>

                            </div>


                            {/* PRICE */}
                            <div

                              className="

                                grid

                                grid-cols-2

                                md:grid-cols-3

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
                                  Price
                                </p>

                                <h4

                                  className="

                                    text-2xl

                                    font-bold
                                  "
                                >

                                  ₹ {item.price}

                                </h4>

                              </div>


                              <div>

                                <p
                                  className="
                                    text-gray-400
                                    text-sm
                                  "
                                >
                                  Quantity
                                </p>

                                <h4

                                  className="

                                    text-2xl

                                    font-bold
                                  "
                                >
                                  {
                                    item.quantity
                                  }
                                </h4>

                              </div>


                              <div>

                                <p
                                  className="
                                    text-gray-400
                                    text-sm
                                  "
                                >
                                  Subtotal
                                </p>

                                <h4

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

                                </h4>

                              </div>

                            </div>

                          </div>

                        </div>
                      )
                    )
                  }

                </div>

              </div>
            ))
          }

        </div>

      </div>

    </div>
  );
}
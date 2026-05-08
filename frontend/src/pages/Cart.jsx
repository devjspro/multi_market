import {
  useEffect,
  useState
} from "react";

import {
  useDispatch,
  useSelector
} from "react-redux";

import {
  fetchCart,
  addToCart,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} from "../features/cart/cartSlice";

import API from "../services/api";

import toast from "react-hot-toast";

import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  CreditCard,
  ShoppingBag
} from "lucide-react";


const fallback =
  "https://via.placeholder.com/300x300?text=No+Image";


export default function CartPage() {

  const dispatch = useDispatch();

  const { items } = useSelector(

    (state) => state.cart
  );

  const [loading, setLoading] =
    useState(false);


  // FETCH CART
  useEffect(() => {

    dispatch(
      fetchCart()
    );

  }, [dispatch]);


  // TOTAL PRICE
  const totalPrice = items.reduce(

    (acc, item) => {

      return (

        acc +

        Number(
          item.product_price
        ) *

        item.quantity
      );
    },

    0
  );


  // CHECKOUT
  const handleCheckout =
    async () => {

      try {

        setLoading(true);

        // CREATE PAYMENT ORDER
        const res = await API.post(

          "/orders/payment/create/"
        );

        const data = res.data;

        const options = {

          key: data.key,

          amount:
            data.payment.amount,

          currency:
            data.payment.currency,

          order_id:
            data.payment.id,

          name:
            "Multi Vendor Marketplace",

          description:
            "Order Payment",

          handler: async function (
            response
          ) {

            try {

              await API.post(

                "/orders/payment/verify/",

                {
                  razorpay_payment_id:
                    response.razorpay_payment_id,

                  razorpay_order_id:
                    response.razorpay_order_id,

                  razorpay_signature:
                    response.razorpay_signature,
                }
              );

              toast.success(
                "Payment successful"
              );

              dispatch(
                fetchCart()
              );

            } catch (err) {

              console.error(err);

              toast.error(
                "Payment verification failed"
              );
            }
          },

          theme: {

            color: "#000000",
          },
        };

        const razor =
          new window.Razorpay(
            options
          );

        razor.open();

      } catch (err) {

        console.error(
          err.response?.data
        );

        toast.error(
          "Checkout failed"
        );

      } finally {

        setLoading(false);
      }
    };


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
            Shopping Cart
          </h1>

          <p

            className="

              text-gray-400

              mt-3
            "
          >
            Review your items before
            checkout.
          </p>

        </div>


        {/* EMPTY CART */}
        {
          items.length === 0 && (

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

              <ShoppingCart

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
                Your Cart is Empty
              </h2>

              <p

                className="

                  text-gray-400

                  mt-3
                "
              >
                Add products to start
                shopping.
              </p>

            </div>
          )
        }


        {/* CART CONTENT */}
        {
          items.length > 0 && (

            <div

              className="

                grid

                grid-cols-1

                lg:grid-cols-3

                gap-10
              "
            >

              {/* ITEMS */}
              <div

                className="

                  lg:col-span-2

                  space-y-6
                "
              >

                {
                  items.map((item) => (

                    <div

                      key={item.id}

                      className="

                        bg-white/5

                        border

                        border-white/10

                        rounded-3xl

                        p-5

                        backdrop-blur-xl

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

                          md:w-44

                          h-44

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

                            md:flex-row

                            md:items-start

                            md:justify-between

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
                              ₹
                              {" "}
                              {
                                item.product_price
                              }
                            </p>

                          </div>


                          {/* REMOVE */}
                          <button

                            onClick={() =>

                              dispatch(

                                removeFromCart(
                                  item.id
                                )
                              )
                            }

                            className="

                              bg-red-500/20

                              hover:bg-red-500

                              transition

                              p-3

                              rounded-xl

                              w-fit
                            "
                          >

                            <Trash2
                              size={20}
                            />

                          </button>

                        </div>


                        {/* QUANTITY */}
                        <div

                          className="

                            flex

                            items-center

                            gap-4

                            mt-8
                          "
                        >

                          <button

                            onClick={() =>

                              dispatch(

                                decreaseQuantity(
                                  item.id
                                )
                              )
                            }

                            className="

                              w-11

                              h-11

                              rounded-xl

                              bg-white/10

                              flex

                              items-center

                              justify-center

                              hover:bg-white/20

                              transition
                            "
                          >

                            <Minus
                              size={18}
                            />

                          </button>


                          <span

                            className="

                              text-2xl

                              font-bold
                            "
                          >
                            {item.quantity}
                          </span>


                          <button

                            onClick={() =>

                              dispatch(

                                addToCart(
                                  item.product
                                )
                              )
                            }

                            className="

                              w-11

                              h-11

                              rounded-xl

                              bg-white/10

                              flex

                              items-center

                              justify-center

                              hover:bg-white/20

                              transition
                            "
                          >

                            <Plus
                              size={18}
                            />

                          </button>

                        </div>


                        {/* TOTAL */}
                        <div className="mt-8">

                          <p
                            className="
                              text-gray-400
                            "
                          >
                            Total
                          </p>

                          <h3

                            className="

                              text-3xl

                              font-bold
                            "
                          >

                            ₹

                            {" "}

                            {
                              Number(
                                item.product_price
                              ) *
                              item.quantity
                            }

                          </h3>

                        </div>

                      </div>

                    </div>
                  ))
                }

              </div>


              {/* SUMMARY */}
              <div>

                <div

                  className="

                    bg-white/5

                    border

                    border-white/10

                    rounded-3xl

                    p-8

                    sticky

                    top-10
                  "
                >

                  <div

                    className="

                      flex

                      items-center

                      gap-3

                      mb-8
                    "
                  >

                    <ShoppingBag
                      size={28}
                    />

                    <h2

                      className="

                        text-3xl

                        font-bold
                      "
                    >
                      Summary
                    </h2>

                  </div>


                  <div className="space-y-5">

                    <div

                      className="

                        flex

                        justify-between
                      "
                    >

                      <span
                        className="
                          text-gray-400
                        "
                      >
                        Items
                      </span>

                      <span>
                        {items.length}
                      </span>

                    </div>


                    <div

                      className="

                        flex

                        justify-between
                      "
                    >

                      <span
                        className="
                          text-gray-400
                        "
                      >
                        Delivery
                      </span>

                      <span>
                        Free
                      </span>

                    </div>


                    <div

                      className="

                        border-t

                        border-white/10

                        pt-5

                        flex

                        justify-between

                        text-2xl

                        font-bold
                      "
                    >

                      <span>
                        Total
                      </span>

                      <span>

                        ₹ {totalPrice}

                      </span>

                    </div>

                  </div>


                  {/* BUTTONS */}
                  <div className="mt-10 space-y-4">

                    <button

                      onClick={
                        handleCheckout
                      }

                      disabled={loading}

                      className="

                        w-full

                        bg-white

                        text-black

                        py-4

                        rounded-2xl

                        font-semibold

                        flex

                        items-center

                        justify-center

                        gap-2

                        hover:scale-[1.02]

                        transition

                        disabled:opacity-50
                      "
                    >

                      <CreditCard
                        size={20}
                      />

                      {
                        loading

                          ? "Processing..."

                          : "Checkout"
                      }

                    </button>


                    <button

                      onClick={() => {

                        dispatch(
                          clearCart()
                        );

                        toast.success(
                          "Cart cleared"
                        );
                      }}

                      className="

                        w-full

                        bg-red-500

                        hover:bg-red-600

                        py-4

                        rounded-2xl

                        font-semibold

                        transition
                      "
                    >

                      Clear Cart

                    </button>

                  </div>

                </div>

              </div>

            </div>
          )
        }

      </div>

    </div>
  );
}
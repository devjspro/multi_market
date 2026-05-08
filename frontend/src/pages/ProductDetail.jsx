import {
  useEffect,
  useState
} from "react";

import {
  useParams
} from "react-router-dom";

import {
  useDispatch
} from "react-redux";

import {
  addToCart
} from "../features/cart/cartSlice";

import API from "../services/api";

import toast from "react-hot-toast";

import {
  ShoppingCart,
  BadgeIndianRupee,
  Package,
  Star,
  Truck,
  ShieldCheck
} from "lucide-react";


const fallback =
  "https://via.placeholder.com/700x500?text=No+Image";


export default function ProductDetail() {

  const { id } = useParams();

  const dispatch = useDispatch();

  const [product, setProduct] =
    useState(null);

  const [loading, setLoading] =
    useState(true);


  // FETCH PRODUCT
  useEffect(() => {

    const fetchProduct =
      async () => {

        try {

          const res = await API.get(
            `/products/${id}/`
          );

          setProduct(res.data);

        } catch (err) {

          console.error(err);

          toast.error(
            "Failed to load product"
          );

        } finally {

          setLoading(false);
        }
      };

    fetchProduct();

  }, [id]);


  // ADD TO CART
  const handleAddToCart =
    () => {

      dispatch(
        addToCart(product.id)
      );

      toast.success(
        "Added to cart"
      );
    };


  // LOADING
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
          Loading Product...
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

        className="

          max-w-7xl

          mx-auto
        "
      >

        <div

          className="

            grid

            grid-cols-1

            lg:grid-cols-2

            gap-10

            items-start
          "
        >

          {/* PRODUCT IMAGE */}
          <div

            className="

              bg-white/5

              border

              border-white/10

              rounded-3xl

              p-5

              backdrop-blur-xl
            "
          >

            <img

              src={
                product.image ||
                fallback
              }

              alt={product.name}

              className="

                w-full

                h-[500px]

                object-cover

                rounded-2xl
              "
            />

          </div>


          {/* PRODUCT INFO */}
          <div>

            {/* CATEGORY */}
            <div

              className="

                inline-flex

                items-center

                gap-2

                bg-white/10

                border

                border-white/10

                px-4

                py-2

                rounded-full

                text-sm

                text-gray-300

                mb-6
              "
            >

              <Star size={16} />

              Premium Product

            </div>


            {/* NAME */}
            <h1

              className="

                text-5xl

                font-bold

                leading-tight
              "
            >

              {product.name}

            </h1>


            {/* PRICE */}
            <div

              className="

                flex

                items-center

                gap-3

                mt-8
              "
            >

              <BadgeIndianRupee
                size={34}
              />

              <h2

                className="

                  text-5xl

                  font-bold
                "
              >

                {product.price}

              </h2>

            </div>


            {/* DESCRIPTION */}
            <div className="mt-8">

              <h3

                className="

                  text-2xl

                  font-semibold

                  mb-3
                "
              >
                Description
              </h3>

              <p

                className="

                  text-gray-300

                  leading-8

                  text-lg
                "
              >

                {
                  product.description
                }

              </p>

            </div>


            {/* STOCK */}
            <div

              className="

                mt-8

                flex

                items-center

                gap-3
              "
            >

              <Package size={22} />

              <span
                className="text-lg"
              >

                Stock Available:

                {" "}

                <strong>

                  {product.stock}

                </strong>

              </span>

            </div>


            {/* FEATURES */}
            <div

              className="

                grid

                grid-cols-1

                md:grid-cols-2

                gap-4

                mt-10
              "
            >

              <div

                className="

                  bg-white/5

                  border

                  border-white/10

                  rounded-2xl

                  p-5

                  flex

                  items-center

                  gap-4
                "
              >

                <Truck
                  size={28}
                />

                <div>

                  <h4
                    className="font-semibold"
                  >
                    Fast Delivery
                  </h4>

                  <p
                    className="text-sm text-gray-400"
                  >
                    Delivered within
                    3-5 days
                  </p>

                </div>

              </div>


              <div

                className="

                  bg-white/5

                  border

                  border-white/10

                  rounded-2xl

                  p-5

                  flex

                  items-center

                  gap-4
                "
              >

                <ShieldCheck
                  size={28}
                />

                <div>

                  <h4
                    className="font-semibold"
                  >
                    Secure Checkout
                  </h4>

                  <p
                    className="text-sm text-gray-400"
                  >
                    Safe payment
                    protection
                  </p>

                </div>

              </div>

            </div>


            {/* BUTTON */}
            <button

              onClick={
                handleAddToCart
              }

              className="

                mt-10

                w-full

                bg-white

                text-black

                py-4

                rounded-2xl

                font-semibold

                text-lg

                flex

                items-center

                justify-center

                gap-3

                transition-all

                hover:scale-[1.02]

                hover:bg-gray-200
              "
            >

              <ShoppingCart
                size={22}
              />

              Add To Cart

            </button>

          </div>

        </div>

      </div>

    </div>
  );
}
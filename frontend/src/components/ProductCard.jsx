import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addToCart
} from "../features/cart/cartSlice";

import toast from "react-hot-toast";

import {
  ShoppingCart,
  Package
} from "lucide-react";


const fallback =
  "https://via.placeholder.com/300x200?text=No+Image";


export default function ProductCard({
  product
}) {

  const dispatch = useDispatch();

  const navigate = useNavigate()
  const handleAddToCart = async () => {

    try {

      await dispatch(
        addToCart(product.id)
      );

      toast.success(
        `${product.name} added to cart`
      );

    } catch (err) {

      toast.error(
        "Failed to add to cart"
      );
    }
  };


  return (

    <div

      className="

        group

        bg-white/5

        border

        border-white/10

        rounded-3xl

        overflow-hidden

        backdrop-blur-xl

        hover:scale-[1.02]

        hover:border-white/20

        transition-all

        duration-300

        shadow-xl
      "
    >

      {/* IMAGE CONTAINER */}
      <div
      onClick={() => {
        navigate(`/products/${product.id}`)
      }}
        className="relative overflow-hidden"
      >

        <img

          src={
            product.image || fallback
          }

          alt={product.name}

          className="

            w-full

            h-64

            object-cover

            group-hover:scale-110

            transition-transform

            duration-500
          "
        />

        {/* STOCK BADGE */}
        <div

          className="

            absolute

            top-4

            left-4

            bg-black/70

            backdrop-blur-md

            text-white

            text-sm

            px-3

            py-1

            rounded-full

            flex

            items-center

            gap-2
          "
        >

          <Package size={14} />

          Stock:
          {" "}
          {product.stock}

        </div>

      </div>


      {/* CONTENT */}
      <div className="p-5">

        {/* NAME */}
        <h2

          className="

            text-xl

            font-bold

            text-white

            line-clamp-1
          "
        >
          {product.name}
        </h2>


        {/* DESCRIPTION */}
        <p

          className="

            text-gray-400

            text-sm

            mt-3

            line-clamp-2

            min-h-[40px]
          "
        >
          {product.description}
        </p>


        {/* PRICE + BUTTON */}
        <div

          className="

            flex

            items-center

            justify-between

            mt-6
          "
        >

          {/* PRICE */}
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

                text-white
              "
            >

              ₹ {product.price}

            </h3>

          </div>


          {/* BUTTON */}
          <button

            onClick={handleAddToCart}

            className="

              flex

              items-center

              gap-2

              bg-white

              text-black

              px-4

              py-3

              rounded-2xl

              font-semibold

              hover:scale-105

              transition-all

              duration-300
            "
          >

            <ShoppingCart
              size={18}
            />

            Add

          </button>

        </div>

      </div>

    </div>
  );
}
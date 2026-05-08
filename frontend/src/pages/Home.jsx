import { useEffect } from "react";

import {
  useDispatch,
  useSelector
} from "react-redux";

import {
  fetchProducts
} from "../features/products/productSlice";

import ProductCard from "../components/ProductCard";

import {
  ShoppingBag,
  Sparkles
} from "lucide-react";


export default function Home() {

  const dispatch = useDispatch();

  const products = useSelector(
    (state) => state.products.items
  );


  useEffect(() => {

    dispatch(fetchProducts());

  }, [dispatch]);


  return (

    <div

      className="

        min-h-screen

        bg-gradient-to-br

        from-black

        via-gray-950

        to-black

        text-white
      "
    >

      {/* HERO SECTION */}
      <section

        className="

          max-w-7xl

          mx-auto

          px-6

          py-16
        "
      >

        <div

          className="

            flex

            flex-col

            md:flex-row

            items-center

            justify-between

            gap-10
          "
        >

          {/* LEFT */}
          <div className="max-w-2xl">

            <div

              className="

                inline-flex

                items-center

                gap-2

                bg-white/10

                border

                border-white/10

                rounded-full

                px-4

                py-2

                mb-6
              "
            >

              <Sparkles size={18} />

              <span
                className="text-sm"
              >
                Modern Multi Vendor Marketplace
              </span>

            </div>


            <h1

              className="

                text-5xl

                md:text-6xl

                font-bold

                leading-tight
              "
            >

              Discover

              <span
                className="text-gray-400"
              >
                {" "}
                Amazing
              </span>

              <br />

              Products Online

            </h1>


            <p

              className="

                text-gray-400

                mt-6

                text-lg

                leading-relaxed
              "
            >

              Explore products from
              multiple vendors with
              secure checkout,
              fast delivery,
              and seamless shopping
              experience.

            </p>


            <div

              className="

                flex

                gap-4

                mt-8
              "
            >

              <button

                className="

                  bg-white

                  text-black

                  px-6

                  py-3

                  rounded-2xl

                  font-semibold

                  hover:scale-105

                  transition
                "
              >

                Shop Now

              </button>


              <button

                className="

                  border

                  border-white/20

                  px-6

                  py-3

                  rounded-2xl

                  hover:bg-white/10

                  transition
                "
              >

                Explore

              </button>

            </div>

          </div>


          {/* RIGHT */}
          <div

            className="

              w-72

              h-72

              rounded-full

              bg-gradient-to-br

              from-white/20

              to-gray-500/20

              blur-0

              flex

              items-center

              justify-center

              border

              border-white/10

              shadow-2xl
            "
          >

            <ShoppingBag
              size={120}
              className="text-white"
            />

          </div>

        </div>

      </section>


      {/* PRODUCTS */}
      <section

        className="

          max-w-7xl

          mx-auto

          px-6

          pb-20
        "
      >

        {/* SECTION TITLE */}
        <div

          className="

            flex

            items-center

            justify-between

            mb-10
          "
        >

          <div>

            <h2

              className="

                text-3xl

                font-bold
              "
            >
              Latest Products
            </h2>

            <p
              className="
                text-gray-400
                mt-2
              "
            >
              Browse our newest arrivals
            </p>

          </div>

        </div>


        {/* PRODUCT GRID */}
        {
          products.length === 0 ? (

            <div

              className="

                text-center

                py-20

                text-gray-400
              "
            >

              <h2
                className="text-2xl"
              >
                No Products Found
              </h2>

            </div>

          ) : (

            <div

              className="

                grid

                grid-cols-1

                sm:grid-cols-2

                lg:grid-cols-3

                xl:grid-cols-4

                gap-8
              "
            >

              {
                products.map((p) => (

                  <ProductCard

                    key={p.id}

                    product={p}
                  />
                ))
              }

            </div>
          )
        }

      </section>

    </div>
  );
}
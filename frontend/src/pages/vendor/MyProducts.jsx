import {
  useEffect,
  useState
} from "react";

import API from "../../services/api";

import {
  Link
} from "react-router-dom";

import toast from "react-hot-toast";

import {
  Pencil,
  Trash2,
  Package,
  Plus
} from "lucide-react";


const fallback =
  "https://via.placeholder.com/400x300?text=No+Image";


export default function MyProducts() {

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);


  const fetchProducts = async () => {

    try {

      const res = await API.get(
        "/products/?mine=true"
      );

      setProducts(res.data);

    } catch (err) {

      console.error(err);

      toast.error(
        "Failed to fetch products"
      );

    } finally {

      setLoading(false);
    }
  };


  useEffect(() => {

    fetchProducts();

  }, []);


  const deleteProduct = async (id) => {

    const confirmDelete =
      window.confirm(
        "Delete this product?"
      );

    if (!confirmDelete) return;

    try {

      await API.delete(
        `/products/${id}/`
      );

      setProducts(

        products.filter(
          (p) => p.id !== id
        )
      );

      toast.success(
        "Product deleted"
      );

    } catch (err) {

      console.error(err);

      toast.error(
        "Delete failed"
      );
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
        <div

          className="

            flex

            flex-col

            md:flex-row

            md:items-center

            md:justify-between

            gap-6

            mb-10
          "
        >

          <div>

            <h1

              className="

                text-5xl

                font-bold
              "
            >
              My Products
            </h1>

            <p

              className="

                text-gray-400

                mt-3
              "
            >
              Manage all your
              marketplace products.
            </p>

          </div>


          <Link
            to="/vendor/add-product"
          >

            <button

              className="

                bg-white

                text-black

                px-6

                py-3

                rounded-2xl

                font-semibold

                flex

                items-center

                gap-2

                hover:scale-105

                transition
              "
            >

              <Plus size={18} />

              Add Product

            </button>

          </Link>

        </div>


        {/* LOADING */}
        {
          loading ? (

            <div
              className="text-center py-20"
            >

              <h2
                className="text-gray-400"
              >
                Loading products...
              </h2>

            </div>

          ) : products.length === 0 ? (

            <div

              className="

                text-center

                py-24

                bg-white/5

                border

                border-white/10

                rounded-3xl
              "
            >

              <Package
                size={70}
                className="
                  mx-auto
                  mb-5
                  text-gray-500
                "
              />

              <h2
                className="text-3xl font-bold"
              >
                No Products Yet
              </h2>

              <p
                className="
                  text-gray-400
                  mt-3
                "
              >
                Start adding products
                to your store.
              </p>

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
                products.map((product) => (

                  <div

                    key={product.id}

                    className="

                      bg-white/5

                      border

                      border-white/10

                      rounded-3xl

                      overflow-hidden

                      backdrop-blur-xl

                      hover:scale-[1.02]

                      transition-all

                      duration-300
                    "
                  >

                    {/* IMAGE */}
                    <img

                      src={
                        product.image ||
                        product.image_url ||
                        fallback
                      }

                      alt={product.name}

                      className="

                        w-full

                        h-60

                        object-cover
                      "
                    />


                    {/* CONTENT */}
                    <div className="p-5">

                      <h2

                        className="

                          text-2xl

                          font-bold

                          line-clamp-1
                        "
                      >
                        {product.name}
                      </h2>

                      <p

                        className="

                          text-gray-400

                          text-sm

                          mt-3

                          line-clamp-2

                          min-h-[40px]
                        "
                      >
                        {
                          product.description
                        }
                      </p>

                      <div

                        className="

                          flex

                          items-center

                          justify-between

                          mt-6
                        "
                      >

                        <div>

                          <h3

                            className="

                              text-2xl

                              font-bold
                            "
                          >

                            ₹ {product.price}

                          </h3>

                          <p
                            className="
                              text-gray-400
                              text-sm
                            "
                          >
                            Stock:
                            {" "}
                            {product.stock}
                          </p>

                        </div>

                      </div>


                      {/* ACTIONS */}
                      <div

                        className="

                          flex

                          gap-3

                          mt-6
                        "
                      >

                        <Link

                          to={`/vendor/edit-product/${product.id}`}

                          className="flex-1"
                        >

                          <button

                            className="

                              w-full

                              bg-white

                              text-black

                              py-3

                              rounded-2xl

                              font-semibold

                              flex

                              items-center

                              justify-center

                              gap-2

                              hover:scale-[1.02]

                              transition
                            "
                          >

                            <Pencil
                              size={18}
                            />

                            Edit

                          </button>

                        </Link>


                        <button

                          onClick={() =>

                            deleteProduct(
                              product.id
                            )
                          }

                          className="

                            flex-1

                            bg-red-500

                            hover:bg-red-600

                            py-3

                            rounded-2xl

                            font-semibold

                            flex

                            items-center

                            justify-center

                            gap-2

                            transition
                          "
                        >

                          <Trash2
                            size={18}
                          />

                          Delete

                        </button>

                      </div>

                    </div>

                  </div>
                ))
              }

            </div>
          )
        }

      </div>

    </div>
  );
}
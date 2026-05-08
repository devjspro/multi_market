import { useState } from "react";

import API from "../../services/api";

import toast from "react-hot-toast";

import {
  Upload,
  PackagePlus
} from "lucide-react";


export default function AddProduct() {

  const [loading, setLoading] =
    useState(false);

  const [preview, setPreview] =
    useState(null);

  const [form, setForm] = useState({

    name: "",

    description: "",

    price: "",

    stock: "",
  });

  const [image, setImage] =
    useState(null);


  const handleImageChange = (e) => {

    const file = e.target.files[0];

    setImage(file);

    if (file) {

      setPreview(
        URL.createObjectURL(file)
      );
    }
  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    const data = new FormData();

    Object.keys(form).forEach((key) => {

      data.append(
        key,
        form[key]
      );
    });

    if (image) {

      data.append(
        "image",
        image
      );
    }

    try {

      await API.post(
        "/products/",
        data
      );

      toast.success(
        "Product added successfully"
      );

      // RESET FORM
      setForm({

        name: "",

        description: "",

        price: "",

        stock: "",
      });

      setImage(null);

      setPreview(null);

    } catch (err) {

      console.error(
        err.response?.data
      );

      toast.error(
        "Failed to add product"
      );
    }

    setLoading(false);
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

        flex

        justify-center

        px-4

        py-12
      "
    >

      <div

        className="

          w-full

          max-w-3xl

          bg-white/5

          border

          border-white/10

          backdrop-blur-xl

          rounded-3xl

          p-8

          shadow-2xl
        "
      >

        {/* HEADER */}
        <div className="mb-10">

          <div

            className="

              w-16

              h-16

              rounded-2xl

              bg-white/10

              flex

              items-center

              justify-center

              mb-5
            "
          >

            <PackagePlus
              size={32}
            />

          </div>

          <h1

            className="

              text-4xl

              font-bold
            "
          >
            Add Product
          </h1>

          <p

            className="

              text-gray-400

              mt-3
            "
          >
            Publish a new product
            to your marketplace store.
          </p>

        </div>


        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* PRODUCT NAME */}
          <div>

            <label

              className="

                block

                text-sm

                text-gray-300

                mb-2
              "
            >
              Product Name
            </label>

            <input

              value={form.name}

              placeholder="Enter product name"

              className="

                w-full

                bg-black/30

                border

                border-white/10

                rounded-2xl

                px-5

                py-4

                outline-none

                focus:border-white/30

                transition
              "

              onChange={(e) =>

                setForm({

                  ...form,

                  name:
                    e.target.value,
                })
              }
            />

          </div>


          {/* DESCRIPTION */}
          <div>

            <label

              className="

                block

                text-sm

                text-gray-300

                mb-2
              "
            >
              Description
            </label>

            <textarea

              rows="4"

              value={form.description}

              placeholder="Write product description"

              className="

                w-full

                bg-black/30

                border

                border-white/10

                rounded-2xl

                px-5

                py-4

                outline-none

                focus:border-white/30

                transition
              "

              onChange={(e) =>

                setForm({

                  ...form,

                  description:
                    e.target.value,
                })
              }
            />

          </div>


          {/* PRICE + STOCK */}
          <div

            className="

              grid

              grid-cols-1

              md:grid-cols-2

              gap-6
            "
          >

            {/* PRICE */}
            <div>

              <label

                className="

                  block

                  text-sm

                  text-gray-300

                  mb-2
                "
              >
                Price
              </label>

              <input

                type="number"

                value={form.price}

                placeholder="Enter price"

                className="

                  w-full

                  bg-black/30

                  border

                  border-white/10

                  rounded-2xl

                  px-5

                  py-4

                  outline-none

                  focus:border-white/30

                  transition
                "

                onChange={(e) =>

                  setForm({

                    ...form,

                    price:
                      e.target.value,
                  })
                }
              />

            </div>


            {/* STOCK */}
            <div>

              <label

                className="

                  block

                  text-sm

                  text-gray-300

                  mb-2
                "
              >
                Stock
              </label>

              <input

                type="number"

                value={form.stock}

                placeholder="Available stock"

                className="

                  w-full

                  bg-black/30

                  border

                  border-white/10

                  rounded-2xl

                  px-5

                  py-4

                  outline-none

                  focus:border-white/30

                  transition
                "

                onChange={(e) =>

                  setForm({

                    ...form,

                    stock:
                      e.target.value,
                  })
                }
              />

            </div>

          </div>


          {/* IMAGE UPLOAD */}
          <div>

            <label

              className="

                block

                text-sm

                text-gray-300

                mb-3
              "
            >
              Product Image
            </label>


            <label

              className="

                border-2

                border-dashed

                border-white/10

                rounded-3xl

                p-8

                flex

                flex-col

                items-center

                justify-center

                cursor-pointer

                hover:border-white/30

                transition
              "
            >

              <Upload
                size={40}
              />

              <p
                className="
                  mt-4
                  text-gray-400
                "
              >
                Click to upload image
              </p>

              <input

                type="file"

                hidden

                onChange={
                  handleImageChange
                }
              />

            </label>


            {/* PREVIEW */}
            {
              preview && (

                <img

                  src={preview}

                  alt="preview"

                  className="

                    mt-6

                    w-full

                    h-72

                    object-cover

                    rounded-2xl
                  "
                />
              )
            }

          </div>


          {/* BUTTON */}
          <button

            disabled={loading}

            className="

              w-full

              bg-white

              text-black

              py-4

              rounded-2xl

              font-semibold

              hover:scale-[1.02]

              transition-all

              duration-300

              disabled:opacity-50
            "
          >

            {
              loading

                ? "Adding Product..."

                : "Add Product"
            }

          </button>

        </form>

      </div>

    </div>
  );
}
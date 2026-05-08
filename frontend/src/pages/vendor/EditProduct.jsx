import {
  useEffect,
  useState
} from "react";

import {
  useParams,
  useNavigate
} from "react-router-dom";

import API from "../../services/api";

import toast from "react-hot-toast";

import {
  Upload,
  Pencil
} from "lucide-react";


export default function EditProduct() {

  const { id } = useParams();

  const navigate = useNavigate();

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


  useEffect(() => {

    API.get(`/products/${id}/`)
      .then((res) => {

        setForm(res.data);

        setPreview(
          res.data.image ||
          res.data.image_url
        );
      });

  }, [id]);


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

      await API.put(
        `/products/${id}/`,
        data
      );

      toast.success(
        "Product updated"
      );

      navigate(
        "/vendor/products"
      );

    } catch (err) {

      console.log(
        err.response?.data
      );

      toast.error(
        "Update failed"
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

            <Pencil
              size={32}
            />

          </div>

          <h1

            className="

              text-4xl

              font-bold
            "
          >
            Edit Product
          </h1>

          <p

            className="

              text-gray-400

              mt-3
            "
          >
            Update your product
            information and stock.
          </p>

        </div>


        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* NAME */}
          <input

            value={form.name}

            placeholder="Product Name"

            className="

              w-full

              bg-black/30

              border

              border-white/10

              rounded-2xl

              px-5

              py-4

              outline-none
            "

            onChange={(e) =>

              setForm({

                ...form,

                name:
                  e.target.value,
              })
            }
          />


          {/* DESCRIPTION */}
          <textarea

            rows="4"

            value={form.description}

            placeholder="Description"

            className="

              w-full

              bg-black/30

              border

              border-white/10

              rounded-2xl

              px-5

              py-4

              outline-none
            "

            onChange={(e) =>

              setForm({

                ...form,

                description:
                  e.target.value,
              })
            }
          />


          {/* PRICE + STOCK */}
          <div

            className="

              grid

              grid-cols-1

              md:grid-cols-2

              gap-6
            "
          >

            <input

              type="number"

              value={form.price}

              placeholder="Price"

              className="

                w-full

                bg-black/30

                border

                border-white/10

                rounded-2xl

                px-5

                py-4

                outline-none
              "

              onChange={(e) =>

                setForm({

                  ...form,

                  price:
                    e.target.value,
                })
              }
            />


            <input

              type="number"

              value={form.stock}

              placeholder="Stock"

              className="

                w-full

                bg-black/30

                border

                border-white/10

                rounded-2xl

                px-5

                py-4

                outline-none
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


          {/* IMAGE */}
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
              Upload New Image
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

                  w-full

                  h-72

                  object-cover

                  rounded-2xl
                "
              />
            )
          }


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

              transition

              disabled:opacity-50
            "
          >

            {
              loading

                ? "Updating..."

                : "Update Product"
            }

          </button>

        </form>

      </div>

    </div>
  );
}
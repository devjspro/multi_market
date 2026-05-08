import {
  Link
} from "react-router-dom";

import {
  Package,
  PlusCircle,
  ShoppingBag,
  ArrowRight
} from "lucide-react";


export default function Dashboard() {

  const cards = [

    {
      title: "Add Product",

      description:
        "Create and publish new products to your marketplace store.",

      icon: PlusCircle,

      link: "/vendor/add-product",

      button: "Add Product",
    },

    {
      title: "My Products",

      description:
        "Manage your products, edit details, stock and pricing.",

      icon: Package,

      link: "/vendor/products",

      button: "View Products",
    },

    {
      title: "Vendor Orders",

      description:
        "Track customer orders and update delivery statuses.",

      icon: ShoppingBag,

      link: "/vendor/orders",

      button: "View Orders",
    },
  ];


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
        <div className="mb-12">

          <h1

            className="

              text-5xl

              font-bold
            "
          >
            Vendor Dashboard
          </h1>

          <p

            className="

              text-gray-400

              mt-4

              text-lg
            "
          >

            Manage your products,
            orders and marketplace
            activities from one place.

          </p>

        </div>


        {/* CARDS */}
        <div

          className="

            grid

            grid-cols-1

            md:grid-cols-2

            lg:grid-cols-3

            gap-8
          "
        >

          {
            cards.map((card, index) => {

              const Icon = card.icon;

              return (

                <div

                  key={index}

                  className="

                    bg-white/5

                    border

                    border-white/10

                    rounded-3xl

                    p-8

                    backdrop-blur-xl

                    hover:border-white/20

                    hover:scale-[1.02]

                    transition-all

                    duration-300

                    shadow-2xl
                  "
                >

                  {/* ICON */}
                  <div

                    className="

                      w-16

                      h-16

                      rounded-2xl

                      bg-white/10

                      flex

                      items-center

                      justify-center

                      mb-6
                    "
                  >

                    <Icon
                      size={32}
                    />

                  </div>


                  {/* TITLE */}
                  <h2

                    className="

                      text-2xl

                      font-bold

                      mb-4
                    "
                  >
                    {card.title}
                  </h2>


                  {/* DESCRIPTION */}
                  <p

                    className="

                      text-gray-400

                      leading-relaxed

                      mb-8
                    "
                  >
                    {card.description}
                  </p>


                  {/* BUTTON */}
                  <Link
                    to={card.link}
                  >

                    <button

                      className="

                        w-full

                        bg-white

                        text-black

                        font-semibold

                        py-3

                        rounded-2xl

                        flex

                        items-center

                        justify-center

                        gap-2

                        hover:scale-[1.02]

                        transition-all

                        duration-300
                      "
                    >

                      {card.button}

                      <ArrowRight
                        size={18}
                      />

                    </button>

                  </Link>

                </div>
              );
            })
          }

        </div>

      </div>

    </div>
  );
}
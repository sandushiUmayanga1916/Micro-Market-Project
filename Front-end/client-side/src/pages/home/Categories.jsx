import React from "react";

const Categories = () => {
  const categoryItems = [
    {
      id: 1,
      title: "Bike Battery",
      des: "(11 batteries)",
      image: "/Images/Home/Bike.png",
    },
    {
      id: 1,
      title: "Car Battery",
      des: "(11 batteries)",
      image: "/Images/Home/car.webp",
    },
    {
      id: 1,
      title: "Van Battery",
      des: "(11 batteries)",
      image: "/Images/Home/Van.png",
    },
    {
      id: 1,
      title: "Other",
      des: "(11 batteries)",
      image: "/Images/Home/Lorry.png",
    },
  ];
  return (
    <div className="selection-container py-16 bg-gradient-to-r from-[#fffdf7] via-[#fff2b2] to-[#ffee99] ...">
      <div className="text-center">
        <p className="subtitle">Top seller</p>
        <p className="title">Popular Categories</p>
      </div>

      {/* Category cards */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-8 justify-between items-center mt-12">
        {categoryItems.map((item, i) => (
          <div
            key={i}
            className=" shadow-lg rounded-md bg-[#f8f9fa] px-5 py-6 w-60 mx-auto
                    text-center cursor-pointer hover:-translate-y-4 duration-300 transition-all"
          >
            <div className="flex w-full mx-auto items-center justify-center">
              <img
                src={item.image}
                alt=""
                className="h-28 w-28 rounded-full bg-0-yellowColor p-5"
              />
            </div>
            <div className="mt-5 space-y-1">
              <h5>{item.title}</h5>
              <p>{item.des}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;

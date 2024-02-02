import React from "react";
import { BsLightningChargeFill } from "react-icons/bs";

const serviceLists = [
  {
    id: 1,
    title: "Charging",
    des: "Swift and efficient battery charging tailored to your needs",
    img: "/Images/Home/Services/icon1.png",
  },
  {
    id: 2,
    title: "Fast delivery",
    des: "Prompt doorstep delivery for batteries when you need them",
    img: "/Images/Home/Services/icon2.png",
  },
  {
    id: 3,
    title: "Online Ordering",
    des: "Hassle-free online platform for quick and easy orders",
    img: "/Images/Home/Services/icon3.png",
  },
  {
    id: 4,
    title: "Special Discount",
    des: "Unlock exclusive savings on top-quality batteries",
    img: "/Images/Home/Services/icon4.png",
  },
];

const OurServices = () => {
  return (
    <div className="selection-container pb-36 bg-gradient-to-r from-[#fffdf7] via-[#fff2b2] to-[#ffee99] ...">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="md:w-1/2">
          <div className="text-left md:w-4/5">
            <p className="subtitle">Our Story & Services</p>
            <h2 className="title">Our Automotive Power Odyssey and Services</h2>
            <p className="my-5 text-0-secondaryColor leading-[30px]">
              Fueled by dedication, we craft enduring automotive power
              solutions, merging technical expertise with unparalleled service.
            </p>

            <button className=" bg-0-yellowColor font-semibold btn text-white px-8 py-3 rounded-full">
              Explore
            </button>
          </div>
        </div>
        <div className="md:w-1/2 ">
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-8 items-center">
            {serviceLists.map((service) => (
              <div
                key={service.id}
                className=" bg-yellow-50 shadow-lg rounded-xl py-5 px-4 text-center space-y-2 text-0-yellowColor cursor-pointer hover:border hover:border-0-yellowColor transition-all duration-200"
              >
                <img src={service.img} alt="" className=" mx-auto" />
                <h5 className="pt-3 font-bold"> {service.title}</h5>
                <p className=" text-yellow-300">{service.des}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurServices;

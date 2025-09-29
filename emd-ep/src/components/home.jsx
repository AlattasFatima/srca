import React from "react";
import bg from "../assets/bg.svg";

function Home() {
  return (
    <div id="home"
      className="relative min-h-[70vh] w-full bg-contain bg-no-repeat bg-center mt-8 pb-24 flex items-center justify-center"
      data-aos="zoom-in"
      data-aos-duration="2500"
      style={{ backgroundImage: `url(${bg})` }}>
      <style>
        {`@media (max-width: 342px) {
          #home {
            background-image: none !important;
          }
        }`}
      </style>

      <div className="text-center text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-relaxed w-5/12 md:w-9/12  text-neutral-700 space-y-4">
        <div className="font-semibold md:font-bold">
          أهلًا بكم في منصتكم التعليمية للمرحل الطبي
        </div>
        <span className="block text-[#2D2E8A] font-extrabold">
          Emergency Medical Dispatch Educational Platform
        </span>
      </div>
    </div>
  );
}

export default Home;

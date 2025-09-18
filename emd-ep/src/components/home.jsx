import React from "react";
import bg from "../assets/bg.svg";

function Home() {
  return (
    <div
      id="home"
      className="relative min-h-[80vh] w-full bg-contain bg-no-repeat bg-center pb-24 flex items-center justify-center"
      data-aos="fade-up"
      data-aos-duration="2500"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <style>
        {`@media (max-width: 342px) {
          #home {
            background-image: none !important;
          }
        }`}
      </style>

      <div className="text-center leading-relaxed w-6/12 xl:w-5/12 text-neutral-700 space-y-4">
        <div className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold md:font-bold">
          أهلًا بكم في منصتكم التعليمية للمرحل الطبي
        </div>
        <span className="block text-base md:text-xl lg:text-2xl xl:text-3xl">
          منصة وجدت لتكون أحد أهم مصادر المعرفة والتطوير، وتجمع بين كيفية التعامل
          مع البروتوكلات ومهارات التواصل، لتدعمكم في أداء رسالتكم الإنسانية
          بأعلى جودة وكفاءة.
        </span>
      </div>
    </div>
  );
}

export default Home;

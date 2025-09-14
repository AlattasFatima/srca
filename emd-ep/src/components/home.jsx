import React from "react";
import bg from "../assets/bg.svg";

function Home() {
  return (
    <div
      id="/"
      className="relative min-h-[80vh] w-full bg-contain bg-no-repeat pb-24
 bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url(${bg})`,
      }}>
      <style>
        {`@media (max-width: 342px) {
            #home {
              background-image: none !important;
            }
          }`
        }
      </style>

      <div className="text-center leading-relaxed w-6/12 text-neutral-800">
        <div className="text-xl md:text-2xl lg:text-3xl font-semibold pb-4">
          أهلًا بكم في منصتكم التعليمية للمرحل الطبي
        </div>
        <span className="text-m md:text-xl lg:text-2xl font-normal">
          منصة وجدت لتكون أحد أهم مصادر المعرفة والتطوير، وتجمع بين كيفية
          التعامل مع البروتوكلات ومهارات التواصل، لتدعمكم في أداء رسالتكم
          الإنسانية بأعلى جودة وكفاءة.
        </span>
      </div>
    </div>
  );
}

export default Home;

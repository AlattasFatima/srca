import React from "react";
import bg from "../assets/bg.jpg";

function Home() {
  return (
    <div id="home" className="relative w-full mt-8">
      {/* خلفية بالصورة مع التظليل */}
      <div
        className="relative w-full"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "auto",
          minHeight: "75vh",
        }}>
        {/* إلغاء الخلفية على الشاشات الصغيرة جدًا */}
        <style>{`@media (max-width: 342px) { #home { background-image: none !important; } }`}</style>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/80 to-black/50" />

        <div className="relative z-10 flex min-h-[70vh] items-center justify-center px-4">
          <div className="text-center text-white text-xl sm:text-2xl lg:text-3xl xl:text-4xl leading-relaxed w-11/12 sm:w-10/12 md:w-9/12 lg:w-7/12 space-y-4">
            <div className="font-semibold md:font-bold">
              أهلًا بكم في منصتكم التعليمية للمرحل الطبي
              <br />
              Emergency Medical Dispatch Educational Platform
            </div>
          </div>
        </div>
      </div>

    <div className="mx-auto w-full max-w-screen-xl px-4 py-6" data-aos="fade-up" data-aos-duration="800">
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-10 text-center text-red-900 font-semibold text-xl md:text-3xl">
        <span className="py-5"> الجودة </span>
        <span className="py-5"> الثقة </span>
        <span className="py-5 sm:col-auto col-span-2"> التطوير المستمر </span>
        <span className="py-5"> السرعة </span>
        <span className="py-5"> الانسانية </span>
      </div>
  </div>
    </div>
  );
}

export default Home;

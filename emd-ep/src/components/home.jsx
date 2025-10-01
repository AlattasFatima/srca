import React from "react";
import { Typewriter } from "react-simple-typewriter";
import bg from "../assets/bg.jpg";

function Home() {
  return (
    <div id="home" className="relative w-full mt-8">
      {/* ====== Section مع الخلفية ====== */}
      <div
        className="relative w-full"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "auto",
          minHeight: "75vh",
        }}
      >
        <style>{`
          @media (max-width: 342px) { 
            #home { background-image: none !important; } 
          }
        `}</style>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/80 to-black/50" />

        <div className="relative z-10 flex min-h-[70vh] items-center justify-center px-4">
          <div className="text-center text-white text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-relaxed w-11/12 sm:w-10/12 md:w-9/12 lg:w-7/12 space-y-4">
            <div className="font-semibold md:font-bold">
              أهلًا بكم في منصتكم التعليمية للمرحل الطبي
              <br />
              Emergency Medical Dispatcher Educational Platform
            </div>
          </div>
        </div>
      </div>

      {/* ====== شريط تحت الخلفية ====== */}
      <div className="w-full bg-red-800 text-white py-4 text-center text-md md:text-xl lg:text-2xl xl:text-3xl font-bold">
  <Typewriter
    words={[
      'الجودة\u00A0\u00A0\u00A0\u00A0\u00A0•\u00A0\u00A0\u00A0\u00A0\u00A0الثقة\u00A0\u00A0\u00A0\u00A0\u00A0•\u00A0\u00A0\u00A0\u00A0\u00A0التطوير المستمر\u00A0\u00A0\u00A0\u00A0\u00A0•\u00A0\u00A0\u00A0\u00A0\u00A0السرعة\u00A0\u00A0\u00A0\u00A0\u00A0•\u00A0\u00A0\u00A0\u00A0\u00A0الإنسانية'
    ]}
    loop={0} // 0 = infinite loop
    cursor
    cursorStyle="|"
    typeSpeed={80}
    deleteSpeed={50}
    delaySpeed={3000}
  />
</div>

    </div>
  );
}

export default Home;

import React from "react";
import Logo from "../assets/logo.svg";
import mission from "../assets/mission.svg";
import vision from "../assets/vision.svg";
import team from "../assets/team.jpg";
import { FaEnvelope, FaPhone } from "react-icons/fa";

function AboutUs() {
  return (
    <div id="about" dir="rtl"
      className="relative isolate min-h-[80vh] w-full pt-10">
      <div aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-1/2 md:w-1/3">
        <div className="h-full w-full bg-gradient-to-br from-red-50 to-red-100/60 rounded-3xl blur-2xl opacity-90" />
      </div>

      {/* About us */}
      <section className="relative z-10 mx-auto max-w-screen-xl px-6 md:px-8 py-6 md:py-10 scroll-mt-[var(--nav-h,96px)]">
        
        <div className="grid md:grid-cols-3 items-center md:gap-8">
          <div className="order-2 text-center md:text-right md:col-span-2 md:max-w-2xl lg:max-w-3xl">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-red-900 leading-snug mb-3"
              data-aos="fade-down" data-aos-duration="2500">
              من نحن؟
            </h2>

            <p className="w- md:w-3/4 text-gray-700 leading-7 text-xl/8 md:text-3xl/10"
              data-aos="fade-up" data-aos-duration="2500">
              منصة وجدت لتكون أحد أهم مصادر المعرفة والتطوير، تجمع بين كيفية التعامل مع البروتوكولات
              الطبية ومهارات التواصل، لتدعمكم في أداء رسالتكم الإنسانية بأعلى جودة وكفاءة.
            </p>
          </div>

          <div className="order-1 flex justify-center md:justify-end">
            <img src={Logo} alt="Logo" className="w-2/3 max-w-[260px]"
              data-aos="fade-left" data-aos-duration="2500"/>
          </div>
        </div>

      </section>

      {/* Mission */}
      <div className="relative z-10 py-5 px-6 md:px-10 mx-6 md:mx-12 lg:mx-28 text-lg/8 md:text-2xl/10 border border-gray-100 border-b-red-800/80 border-b-4 hover:shadow-2xl rounded-lg shadow-lg mb-6 bg-white/80 backdrop-blur-sm"
        data-aos="fade-right" data-aos-duration="2500">
        
        <section className="flex flex-col md:flex-row items-center justify-between gap-6">
          <img src={mission} className="h-12 md:h-14" alt="mission" />
          <p className="flex-1 py-2 text-center md:text-right text-neutral-700">
            <span className="text-2xl md:text-3xl lg:text-4xl font-semibold text-red-900">
              رؤيتنا
            </span>
            <br />
            أن تكون المنصة المرجع الأول لتأهيل وتطوير المرحّل الطبي بما يحقق أعلى معايير الجودة
            والاحترافية في إدارة البلاغات الإسعافية.
          </p>
        </section>

      </div>

      {/* Vision */}
      <div className="relative z-10 py-5 px-6 md:px-10 mx-6 md:mx-12 lg:mx-28 text-lg/8 md:text-2xl/10 border border-gray-100 border-b-red-800/80 border-b-4 hover:shadow-2xl rounded-lg shadow-lg mb-6 bg-white/80 backdrop-blur-sm"
        data-aos="fade-right" data-aos-duration="2500">

        <section className="flex flex-col md:flex-row items-center justify-between gap-6">
          <img src={vision} className="h-12 md:h-14" alt="vision" />
          <p className="flex-1 py-2 text-center md:text-right font-normal text-neutral-700">
            <span className="text-2xl md:text-3xl lg:text-4xl font-semibold text-red-900">
              رسالتنا
            </span>
            <br />
            نلتزم بتقديم محتوى تعليمي وتفاعلي مرئي ومقروء يدمج البروتوكولات الطبيّة ومهارات التواصل؛
            لتمكين المرحّل الطبي من أداء رسالته الإنسانية بكفاءة، ثقة، وفاعلية.
          </p>
        </section>

      </div>

      {/* Team */}
      <section className="relative z-10 px-6 md:px-12 lg:px-28 pb-4 mt-12 text-lg md:text-2xl">
        
        <img src={team} alt="team" className="h-auto w-full max-w-4xl mx-auto rounded-md"
          data-aos="fade-down" data-aos-duration="500"/>

        <div className="py-5 text-center text-2xl md:text-3xl lg:text-4xl font-semibold text-red-900"
          data-aos="fade-up" data-aos-duration="2500">
          فريق العمل
        </div>

        <p className="text-lg/8 md:text-2xl/10 py-4 lg:w-4/6 mx-auto mb-8 text-center font-normal text-neutral-700"
          data-aos="fade-left" data-aos-duration="2500">
          يقف خلف هذه المنصة فريق واحد متكامل من اخصائيين ضمان جودة إرسال الطوارئ بقسم الجودة بمنطقة مكة المكرمة، يعملون بروح
          مشتركة في تمكين المرحّل الطبي من أداء دوره الحيوي بكفاءة وفعالية لتقديم محتوى تدريبي متجدد
          وتجربة تعليمية ملهمة تسهم في جودة الاستجابة الإسعافية وإنقاذ الأرواح.
        </p>

      </section>

      {/* Footer */}
      <footer id="footer" dir="ltr"
        className="relative z-10 w-full bg-red-900 text-white text-lg p-6">
        <div className="container mx-auto flex flex-row justify-between items-center px-4">
          <p className="mb-0 text-right">
            &copy; {new Date().getFullYear()} جميع الحقوق محفوظة
          </p>

          <div className="flex space-x-6 text-2xl">
            <a
              href="mailto:EMD.660@srca.org.sa?subject=استفسار&body=السلام عليكم،"
              className="hover:text-blue-300 transition-colors"
              title="راسلنا عبر البريد الإلكتروني">
              <FaEnvelope />
            </a>

            <a
              href="tel:0112805555,22381"
              className="hover:text-green-300 transition-colors"
              title="اتصل بنا">
              <FaPhone />
            </a>

          </div>
        </div>
      </footer>
    </div>
  );
}

export default AboutUs;

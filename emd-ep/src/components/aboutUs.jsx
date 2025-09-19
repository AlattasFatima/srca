import React from "react";
import Logo from "../assets/logo.svg";
import mission from "../assets/mission.svg";
import vision from "../assets/vision.svg";
import team from "../assets/team.jpg";
import { FaEnvelope, FaPhone } from "react-icons/fa";

function AboutUs() {
  return (
    <div id="about" className="min-h-[80vh] w-full pt-10">
      
      <section className="mx-auto max-w-screen-xl px-8 md:px-8 py-6 md:py-10 scroll-mt-[var(--nav-h,96px)]">
        <div className="grid md:grid-cols-2 items-center">
          <div className="order-2 text-center md:text-right">
            <h2 className="md:text-righttext-2xl md:text-3xl lg:text-4xl font-extrabold text-red-900 leading-snug mb-3"
            data-aos="fade-down" data-aos-duration="2500">
              من نحن؟   
            </h2>
            <p className="text-gray-700 leading-7 text-lg/8 md:text-2xl/10"
            data-aos="fade-up" data-aos-duration="2500">
              منصة وجدت لتكون أحد أهم مصادر المعرفة والتطوير،
              تجمع بين كيفية التعامل مع البروتوكولات الطبية ومهارات التواصل،
              لتدعمكم في أداء رسالتكم الإنسانية بأعلى جودة وكفاءة.
            </p>
          </div>

          <div className="order-1 flex justify-center md:justify-end">
            <img
              src={Logo}
              alt="EMD Logo"
              className="w-1/2 lg:items-center" data-aos="fade-left" data-aos-duration="2500"/>
          </div>
        </div>
      </section>


      <div className="py-5 px-6 md:px-20 mx-20 lg:mx-44 xl:mx-77 text-lg/8 md:text-2xl/10 border border-gray-100 border-b-red-800/80 border-b-4 hover:shadow-2xl rounded-lg shadow-lg mb-6" data-aos="fade-left" data-aos-duration="2500">
        <section className="flex flex-col md:flex-row items-center justify-between">
          <img src={mission} className="h-12 pl-8 mb-4 md:mb-0 md:w-auto" />
          <p className="flex-1 py-4 text-center md:text-right text-neutral-700">
            <span className="text-2xl md:text-3xl lg:text-4xl font-semibold text-red-900">رؤيتنا</span><br />
            أن تكون المنصة المرجع الأول لتأهيل وتطوير المرحّل الطبي بما يحقق أعلى معايير الجودة والاحترافية في إدارة البلاغات الإسعافية.
          </p>
        </section>
      </div>
      
      <div className="py-5 px-6 md:px-20 mx-20 lg:mx-44 xl:mx-77 text-right text-lg/8 md:text-2xl/10 border  border-gray-100 border-b-red-800/80 border-b-4 hover:shadow-2xl rounded-lg shadow-md mb-6" data-aos="fade-right" data-aos-duration="2500">
        <section className="flex flex-col md:flex-row items-center justify-between">
          <img src={vision} className="h-12 pl-8 mb-4 md:mb-0 md:w-auto" />
          <p className="flex-1 py-4 text-center md:text-right font-normal text-neutral-700">
            <span className="text-2xl md:text-3xl lg:text-4xl font-semibold text-red-900">رسالتنا</span><br />
            نلتزم بتقديم محتوى تعليمي وتفاعلي مرئي ومقروء يدمج بالبروتوكولات الطبيّة ومهارات التواصل؛ لتمكين المرحّل الطبي من أداء رسالته الإنسانية بكفاءة، ثقة، وفاعلية.
          </p>
        </section>
      </div>
      
      <section className="px-10 lg:px-44 pb-4 md:px-20 mt-20 text-lg md:text-2xl">
        <img src={team}
          className="h-8/12 md:mb-0 md:w-auto mx-auto rounded-md"
          data-aos="fade-down"
          data-aos-duration="500" />
    
        <div className="py-5 text-center text-2xl md:text-3xl lg:text-4xl font-semibold text-red-900"
          data-aos="fade-up"
          data-aos-duration="2500">
          فريق العمل
        </div>
        
        <p className="text-lg/8 md:text-2xl/10 py-4 lg:w-4/6 mx-auto mb-8 text-center font-normal text-neutral-700"
          data-aos="fade-left"
          data-aos-duration="2500">
          يقف خلف هذه المنصة فريق واحد متكامل من اخصائيين ضمان جودة وتطوير إرسال الطوارئ،
          يعملون بروح مشتركة في تمكين المرحّل الطبي من أداء دوره الحيوي بكفاءة وفعالية
          لتقديم محتوى تدريبي متجدد وتجربة تعليمية ملهمة تسهم في جودة الاستجابة الإسعافية وإنقاذ الأرواح.
        </p>
      </section>


      <footer id="footer" dir="ltr" className="w-full bg-red-900 text-white text-lg p-6 ">
      <div className="container mx-auto flex flex-row justify-between items-center px-4">
        <p className="mb-0 text-right">
          &copy; {new Date().getFullYear()} جميع الحقوق محفوظة
        </p>
        <div className="flex space-x-6 text-2xl">
          <a
            href="mailto:EMD.660@srca.org.sa?subject=استفسار&body=السلام عليكم،"
            className="hover:text-blue-900 transition-colors" 
            title="راسلنا عبر البريد الإلكتروني">
              <FaEnvelope />
              </a>
          <a
            href="tel:0112805555,22381" 
            className="hover:text-green-900 transition-colors"
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

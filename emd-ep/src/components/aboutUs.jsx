import React from "react";

function AboutUs() {
  return (
     <div id="about" className="min-h-[80vh] w-full pt-10">
      <div className="font-serif py-5 px-20 text-center text-xl font-semibold text-red-900">
        من نحن؟
      </div>

      <div className="font-serif py-5 px-20 text-center text-xl font-semibold text-red-900">
        رؤيتنا
      </div>
      <p className="font-serif px-32 pb-10 text-center">
        أن تكون المنصة المرجع الأول لتأهيل وتطوير المرحّل الطبي بما يحقق 
        أعلى معايير الجودة والاحترافية في إدارة البلاغات الإسعافية.
      </p>
      
      <div className="font-serif py-5 px-20 text-center text-xl font-semibold text-red-900">
        رسالتنا
      </div>
      <p className="font-serif px-32 pb-10 text-center">
        نلتزم بتقديم محتوى تعليمي وتفاعلي مرئي ومقروء يدمج بالبروتوكولات الطبيّة ومهارات التواصل؛
         لتمكين المرحّل الطبي من أداء رسالته الإنسانية بكفاءة، ثقة، وفاعلية.
      </p>

      <div className="font-serif py-5 px-20 text-center text-xl font-semibold text-red-900">
        فريق العمل
      </div>
      <p className="font-serif px-32 pb-10 text-center">
        يقف خلف هذه المنصة فريق واحد متكامل من اخصائيين ضمان جودة وتطوير إرسال الطوارئ، 
        يعملون بروح مشتركة في تمكين المرحّل الطبي من أداء دوره الحيوي بكفاءة وفعالية
         لتقديم محتوى تدريبي متجدد وتجربة تعليمية ملهمة تسهم في جودة الاستجابة الإسعافية وإنقاذ الأرواح.
      </p>
    </div> 
    )
}

export default AboutUs;
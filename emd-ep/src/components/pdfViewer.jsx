import React from "react";

export default function PDFViewer({ src, title }) {
  return (
    <section className="min-h-[calc(100vh-5rem)] w-full bg-[#f7f7f7]">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-[#2D2E8A] mb-4">{title}</h1>

        <div className="w-full aspect-[3/4] md:aspect-[16/9] rounded-2xl shadow overflow-hidden">
          
          <object
            data={src}
            type="application/pdf"
            className="w-full h-full"
            aria-label={title}>

            <embed src={src} type="application/pdf" className="w-full h-full" />

            <div className="p-6 text-center">
              <p className="mb-3"
              >لا يمكن عرض الملف داخل المتصفح.
              </p>
              
              <a
                href={src}
                download
                className="inline-block rounded-2xl px-4 py-2 bg-[#82181a] text-white hover:opacity-90">
                تحميل الملف
              </a>

            </div>
          </object>
        </div>

        <p className="hidden lg:block lg:text-lg text-[#404040] mt-3">
          ملاحظة: لتجربة عرض أفضل، قم بتنزيل الملف.
        </p>

      </div>
    </section>
  );
}

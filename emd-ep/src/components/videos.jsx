// src/components/Videos.jsx
import React, { useEffect, useState } from "react";

const MODULES = [
  {
    id: "m1",
    title: "سلسلة توقف قلب وتنفس",
    topics: [
      { id: "t1", title: "مدخل الحالة المسار السريع، مثال لعرض المقطع", videoUrl: "../../public/cpr.mp4" },
      { id: "t2", title: "الاستخدام الأمثل لأداة مراقبة الضغطات المطورة", videoUrl: "https://www.example.com/video2.mp4" },
      { id: "t3", title: "وضع المريض", videoUrl: "https://www.example.com/video3.mp4" },
    ],
  },
  {
    id: "m2",
    title: "السلسلة الثانية",
    topics: [
      { id: "t4", title: "الفيديو الاول", videoUrl: "https://www.example.com/video4.mp4" },
    ],
  },
];

export default function Videos() {
  // Active selection: module index + topic index
  const [active, setActive] = useState({ module: 0, topic: 0 });
  // Sidebar open/closed state
  const [menuOpen, setMenuOpen] = useState(true);

  // Auto-open the menu whenever viewport is >= md
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(true);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Select a module
  const selectModule = (moduleIndex) => {
    setActive({ module: moduleIndex, topic: 0 });
    if (window.innerWidth < 768) setMenuOpen(false);
  };

  // Select a topic inside a module
  const selectTopic = (moduleIndex, topicIndex) => {
    setActive({ module: moduleIndex, topic: topicIndex });
    if (window.innerWidth < 768) setMenuOpen(false);
  };

  // Resolve currently active content (module and topic)
  const module = MODULES[active.module];
  const topic = module.topics[active.topic];

  return (
    <div dir="rtl" className="min-h-screen bg-white">
      {/* Page container with responsive horizontal padding (px) and max width */}
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#82181a]">المحتوى المرئي</h1>
          <button
            onClick={() => setMenuOpen((s) => !s)}
            className="md:hidden px-4 py-2 rounded-lg border shadow-sm text-sm"
            style={{ borderColor: "#404040", color: "#404040", background: "#ffffff" }}
          >
            {menuOpen ? "إغلاق القائمة" : "فتح القائمة"}
          </button>
        </div>

        {/* Two-column layout on md+; stacked on small screens */}
        <div className="grid md:grid-cols-[20rem_1fr] gap-6">
          {/* Sidebar */}
          <aside>
            <div
              className={[
                "rounded-2xl border shadow-sm overflow-hidden transition-all duration-300",
                menuOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0",
                "md:max-h-none md:opacity-100",
              ].join(" ")}
              style={{ background: "#ffffff", borderColor: "#404040" }}
            >
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-3" style={{ color: "#404040" }}>
                  الفيديوهات
                </h2>

                <ul className="space-y-2">
                  {MODULES.map((m, mi) => {
                    const isActive = active.module === mi;
                    return (
                      <li key={m.id} className="space-y-2">
                        {/* Module button */}
                        <button
                          onClick={() => selectModule(mi)}
                          className={[
                            "w-full text-right px-3 py-2 rounded-lg transition-colors",
                            "whitespace-normal break-words leading-6", // <-- wrap long titles nicely
                            isActive ? "text-[#404040]" : "hover:bg-gray-100 text-[#404040]",
                          ].join(" ")}
                        >
                          {m.title}
                        </button>

                        {/* Topics (only when active) */}
                        {isActive && (
                          <ul className="pr-4 space-y-1">
                            {m.topics.map((t, ti) => {
                              const selected = active.module === mi && active.topic === ti;
                              return (
                                <li key={t.id}>
                                  {/* Topic button */}
                                  <button
                                    onClick={() => selectTopic(mi, ti)}
                                    className={[
                                      "w-full text-right px-3 py-2 rounded-lg transition-colors",
                                      "whitespace-normal break-words leading-6", // <-- wrap long titles
                                      selected
                                        ? "bg-[#2D2E8A] text-white"
                                        : "hover:bg-gray-100 text-[#404040]",
                                    ].join(" ")}
                                  >
                                    {t.title}
                                  </button>
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </aside>

          {/* Video panel */}
          <section
            className={[
              "rounded-2xl border shadow-sm flex flex-col",
              "overflow-visible",
            ].join(" ")}
            style={{ background: "#ffffff", borderColor: "#404040" }}
          >
            {/* Toolbar */}
            <div
              className="flex items-start sm:items-center justify-between gap-3 border-b px-4 py-3"
              style={{ borderColor: "#404040" }}
            >
              <div className="min-w-0">
                <h3 className="font-semibold text-[#2D2E8A] text-lg">{topic.title}</h3>
                
                {/* Add Module name here in smaller, lighter font */}
                <p className="text-sm text-gray-500 mt-1">
                  {module.title} {/* Module name below topic title */}
                </p>
              </div>
            </div>

            {/* Video content */}
            <div className="mx-4 sm:mx-6 md:mx-10 lg:mx-16 xl:mx-24 2xl:mx-32 py-5">
              <video width="100%" height="auto" controls>
                <source src={topic.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

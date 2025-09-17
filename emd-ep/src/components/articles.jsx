// src/components/Articles.jsx
import React, { useEffect, useState } from "react";

// 4 topics — the 3rd topic has two child articles
const TOPICS = [
  { id: "t1", title: "أفضل الممارسات لتقديم تعليمات ما بعد الإرسال / تعليمات ما قبل الوصول", 
    body: "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق. إذا كنت تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد النص العربى زيادة عدد الفقرات كما تريد، النص لن يبدو مقسما ولا يحوي أخطاء لغوية، مولد النص العربى مفيد لمصممي المواقع على وجه الخصوص، حيث يحتاج العميل فى كثير من الأحيان أن يطلع على صورة حقيقية لتصميم الموقع" },
  { id: "t2", title: "المحاضرات الذاتية", body: "سيدرج النص لاحقًا" },
  {
    id: "t3",
    title: "أفضل الممارسات أثناء الاستجواب",
    body: "سيدرج النص لاحقًا"},
  { id: "t4", title: "السياسات", 
    children: [
      { id: "t4-a1", title: "السياسات الصادرة من إدارة قسم الترحيل", body: "سيدرج النص لاحقًا" },
      { id: "t4-a2", title: "سياسات قسم الجودة", body: "سيدرج النص لاحقًا" },
    ] 
  },
];

export default function Articles() {
  // Active selection: topic index + optional child index
  const [active, setActive] = useState({ topic: 0, child: null });
  // Zoom percentage (applies to reader text)
  const [zoom, setZoom] = useState(100);
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

  // Select a main topic; if it has children, default to first child
  const selectTopic = (topicIndex) => {
    const t = TOPICS[topicIndex];
    setActive({ topic: topicIndex, child: Array.isArray(t.children) ? 0 : null });
    if (window.innerWidth < 768) setMenuOpen(false);
  };

  // Select a child article inside a topic
  const selectChild = (topicIndex, childIndex) => {
    setActive({ topic: topicIndex, child: childIndex });
    if (window.innerWidth < 768) setMenuOpen(false);
  };

  const zoomIn = () => setZoom((z) => Math.min(220, z + 10));
  const zoomOut = () => setZoom((z) => Math.max(70, z - 10));
  const zoomReset = () => setZoom(100);

  // Resolve currently active content (topic or child)
  const topic = TOPICS[active.topic];
  const content =
    Array.isArray(topic.children) && active.child !== null
      ? topic.children[active.child]
      : topic;

  return (
    <div dir="rtl" className="min-h-screen bg-white">
      {/* Page container with responsive horizontal padding (px) and max width */}
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#82181a]">المحتوى المقروء</h1>
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
                  المقالات
                </h2>

                <ul className="space-y-2">
                  {TOPICS.map((t, ti) => {
                    const isActive = active.topic === ti;
                    const hasChildren = Array.isArray(t.children);
                    return (
                      <li key={t.id} className="space-y-2">
                        {/* Main topic button
                           - Allow wrapping on small screens
                           - Prevent horizontal overflow
                           - Maintain readable line-height */}
                        <button
                          onClick={() => selectTopic(ti)}
                          className={[
                            "w-full text-right px-3 py-2 rounded-lg transition-colors",
                            "whitespace-normal break-words leading-6", // <-- wrap long titles nicely
                            isActive && !hasChildren
                              ? "bg-[#2D2E8A] text-white"
                              : "hover:bg-gray-100 text-[#404040]",
                          ].join(" ")}
                        >
                          {t.title}
                        </button>

                        {/* Child articles (only when active) */}
                        {hasChildren && isActive && (
                          <ul className="pr-4 space-y-1">
                            {t.children.map((c, ci) => {
                              const selected = active.topic === ti && active.child === ci;
                              return (
                                <li key={c.id}>
                                  {/* Child button with wrapping as well */}
                                  <button
                                    onClick={() => selectChild(ti, ci)}
                                    className={[
                                      "w-full text-right px-3 py-2 rounded-lg transition-colors",
                                      "whitespace-normal break-words leading-6", // <-- wrap long child titles
                                      selected
                                        ? "bg-[#2D2E8A] text-white"
                                        : "hover:bg-gray-100 text-[#404040]",
                                    ].join(" ")}
                                  >
                                    {c.title}
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

          {/* Reader panel */}
          <section
            className={[
              "rounded-2xl border shadow-sm flex flex-col",
              // Height should grow automatically; ensure overflow is visible
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
                {/* Title: allow wrapping on small screens */}
                <h3 className={[
                  "font-semibold text-[#2D2E8A]",
                  // Responsive font size
                  "text-base sm:text-lg md:text-xl",
                  // Wrap long titles (no overflow)
                  "whitespace-normal break-words",
                ].join(" ")}>
                  {content.title}
                </h3>

                {/* Parent topic (for branched topic) */}
                <p className="text-xs sm:text-sm text-[#404040] whitespace-normal break-words">
                  {Array.isArray(topic.children) ? topic.title : "—"}
                </p>
              </div>

              {/* Zoom controls */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={zoomOut}
                  className="px-3 py-1 rounded-lg border"
                  style={{ borderColor: "#404040", color: "#404040" }}
                  aria-label="Zoom out"
                >
                  −
                </button>
                <span className="text-sm w-12 text-center text-[#404040]">{zoom}%</span>
                <button
                  onClick={zoomIn}
                  className="px-3 py-1 rounded-lg border"
                  style={{ borderColor: "#404040", color: "#404040" }}
                  aria-label="Zoom in"
                >
                  +
                </button>
                <button
                  onClick={zoomReset}
                  className="ml-1 px-3 py-1 rounded-lg border text-sm"
                  style={{ borderColor: "#404040", color: "#404040" }}
                  aria-label="Reset zoom"
                >
                  إعادة
                </button>
              </div>
            </div>

            {/* Reader content
               - Responsive inner margins (mx)
               - Auto height with padding
               - Text scales with zoom */}
            <div
              className={[
                "mx-4 sm:mx-6 md:mx-10 lg:mx-16 xl:mx-24 2xl:mx-32",
                "py-5",
                "max-w-3xl",
                // Make sure long words (or URLs) wrap instead of overflowing
                "break-words whitespace-normal",
              ].join(" ")}
              style={{
                // Responsive base font size + zoom multiplier
                ["--baseSize"]: "clamp(1.0em, 0.95em + 0.5vw, 1.2em)",
                ["--zoom"]    : zoom,
                fontSize      : "calc(var(--baseSize) * (var(--zoom) / 100))",
                color: "#404040",
              }}
            >
              {/* Add a little extra bottom padding so tall content breathes */}
              <div className="pb-2">
                <p className="leading-7 md:leading-8">{content.body}</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

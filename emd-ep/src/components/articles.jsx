import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function highlightToHtml(md, highlights = []) {
  let out = md;
  for (const h of highlights) {
    const re = h.regex ?? new RegExp(escapeRegex(h.text), "gi");
    out = out.replace(re, (m) => `<span class="${h.className}">${m}</span>`);
  }
  return out;
}

const TOPICS = [
  {
    id: "t1",
    title: "عتبة الأداء",
    body: `# ماهي عتبة الأداء
هي خاصية ببرنامج **AQUA ASCENT** لقياس اداء **المرحل الطبي**، تمنحه درجة بناءً على تقييم المكالمات بحيث:
- **10** الدرجة الأعلى
- **1** الدرجة الأدنى

## كيف تُحسب؟
تحسب من خلال **جمع النقاط** التي حصل عليها المرحل الطبي من خلال كل مكالمة له **ثم تقسيمها** على عدد المكالمات.

## بخصوص النقاط:
- يمنح المرحل الطبي 10 درجات على كل مكالمة مستوى: **التزام عالي**
- يمنح **8** درجات على كل مكالمة مستوى: **ملتزم**
- يمنح **5** درجات على كل مكالمة مستوى: **التزام جزئي**
- يمنح **درجتان** على كل مكالمة مستوى: **التزام منخفض**
- يمنح **درجة واحدة** على كل مكالمة مستوى: **غير ملتزم**

## مثال توضيحي
مرحل طبي لديه **65** مكالمة خلال ثلاث أشهر  
حصل خلالها على **64** مكالمة **التزام عالي** ومكالمة واحدة **مستوى ملتزم**:

\`\`\`
64 * 10 = 640
1  * 8  =   8
المجموع = 648
648 / 65 = 9.97
\`\`\`
`,
  },
];

export default function Articles() {
  const [active, setActive] = useState({ topic: 0, child: null });
  const [zoom, setZoom] = useState(100);
  const [menuOpen, setMenuOpen] = useState(true);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(true);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const selectTopic = (topicIndex) => {
    const t = TOPICS[topicIndex];
    setActive({ topic: topicIndex, child: Array.isArray(t.children) ? 0 : null });
    if (window.innerWidth < 768) setMenuOpen(false);
  };

  const selectChild = (topicIndex, childIndex) => {
    setActive({ topic: topicIndex, child: childIndex });
    if (window.innerWidth < 768) setMenuOpen(false);
  };

  const zoomIn = () => setZoom((z) => Math.min(220, z + 10));
  const zoomOut = () => setZoom((z) => Math.max(70, z - 10));
  const zoomReset = () => setZoom(100);

  const topic = TOPICS[active.topic];
  const content = Array.isArray(topic.children) && active.child !== null ? topic.children[active.child] : topic;

  // الكلمات
  const HIGHLIGHTS = [
    { text: "AQUA ASCENT", className: "text-[#2D2E8A] font-semibold" },
    { regex: /التزام عالي/gi, className: "bg-yellow-100 text-yellow-900 px-1 rounded" },
    { regex: /غير ملتزم/gi, className: "bg-red-100 text-red-800 px-1 rounded" },
    { regex: /(?:ال)?درج(?:ة|تان|ات)/g, className: "text-[#82181a] font-bold" },
  ];

  // نولّد Markdown يحوي <span> ملوّنة:
  const styledMd = highlightToHtml(content.body, HIGHLIGHTS);

  return (
    <div dir="rtl" className="h-full bg-white mt-8">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#82181a]">المحتوى المقروء</h1>
          
          <button onClick={() => setMenuOpen((s) => !s)}
            className="md:hidden px-4 py-2 rounded-lg border shadow-sm text-sm"
            style={{ borderColor: "#404040", color: "#404040", background: "#ffffff" }}>
            {menuOpen ? "إغلاق القائمة" : "فتح القائمة"}
          </button>

        </div>

        <div className="grid md:grid-cols-[20rem_1fr] gap-6">
          <aside>
            <div
              className={[ "rounded-2xl border shadow-sm overflow-hidden transition-all duration-300",
                menuOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0",
                "md:max-h-none md:opacity-100",
              ].join(" ")}
              style={{ background: "#ffffff", borderColor: "#404040" }}>
                
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-3" style={{ color: "#404040" }}>المقالات</h2>
                <ul className="space-y-2">
                  {TOPICS.map((t, ti) => {
                    const isActive = active.topic === ti;
                    const hasChildren = Array.isArray(t.children);
                    return (
                      <li key={t.id} className="space-y-2">
                        <button
                          onClick={() => selectTopic(ti)}
                          className={[
                            "w-full text-right px-3 py-2 rounded-lg transition-colors whitespace-normal break-words leading-6",
                            isActive && !hasChildren ? "bg-[#2D2E8A] text-white" : "hover:bg-gray-100 text-[#404040]",
                          ].join(" ")}>

                          {t.title}
                        </button>
                        {hasChildren && isActive && (
                          <ul className="pr-4 space-y-1">
                            {t.children.map((c, ci) => {
                              const selected = active.topic === ti && active.child === ci;
                              return (
                                <li key={c.id}>
                                  <button
                                    onClick={() => selectChild(ti, ci)}
                                    className={[
                                      "w-full text-right px-3 py-2 rounded-lg transition-colors whitespace-normal break-words leading-6",
                                      selected ? "bg-[#2D2E8A] text-white" : "hover:bg-gray-100 text-[#404040]",
                                    ].join(" ")}>

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

          <section
            className={["rounded-2xl border shadow-sm flex flex-col overflow-visible"].join(" ")}
            style={{ background: "#ffffff", borderColor: "#404040" }}>

            <div className="flex items-start sm:items-center justify-between gap-3 border-b px-4 py-3"
              style={{ borderColor: "#404040" }}>

              <div className="min-w-0">
                <h3
                  className={[
                    "font-semibold text-[#2D2E8A]",
                    "text-base sm:text-lg md:text-xl",
                    "whitespace-normal break-words",
                  ].join(" ")}>
                  {content.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#404040] whitespace-normal break-words">
                  {Array.isArray(topic.children) ? topic.title : "—"}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={zoomOut}
                  className="px-3 py-1 rounded-lg border"
                  style={{ borderColor: "#404040", color: "#404040" }}
                  aria-label="Zoom out">
                  −
                </button>
                <span className="text-sm w-12 text-center text-[#404040]">{zoom}%</span>
                <button
                  onClick={zoomIn}
                  className="px-3 py-1 rounded-lg border"
                  style={{ borderColor: "#404040", color: "#404040" }}
                  aria-label="Zoom in">
                  +
                </button>
                <button
                  onClick={zoomReset}
                  className="ml-1 px-3 py-1 rounded-lg border text-sm"
                  style={{ borderColor: "#404040", color: "#404040" }}
                  aria-label="Reset zoom">
                  إعادة
                </button>
              </div>
            </div>

            <div
              className={[
                "mx-4 sm:mx-6 md:mx-10 lg:mx-16 xl:mx-24 2xl:mx-32",
                "py-5",
                "max-w-3xl",
                "break-words whitespace-normal",
              ].join(" ")}
              style={{
                ["--baseSize"]: "clamp(1.0em, 0.95em + 0.5vw, 1.2em)",
                ["--zoom"]: zoom,
                fontSize: "calc(var(--baseSize) * (var(--zoom) / 100))",
                color: "#404040",
              }}>
              {/* عرض Markdown مع ألوان مخصصة للكلمات */}
              <div className="pb-2 prose prose-neutral max-w-none rtl">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    h1: (props) => (
                      <h1 className="text-2xl md:text-3xl font-extrabold text-[#82181a] mb-4" {...props} />
                    ),
                    h2: (props) => (
                      <h2 className="text-xl md:text-2xl font-bold text-[#2D2E8A] mt-6 mb-3" {...props} />
                    ),
                    code: (props) => <code className="px-1.5 py-0.5 rounded bg-gray-100" {...props} />,
                    li: (props) => <li className="leading-7" {...props} />,
                  }}>
                  {styledMd}
                </ReactMarkdown>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

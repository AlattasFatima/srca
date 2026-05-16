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
    const re =
      h.regex ?? new RegExp(escapeRegex(h.text), "gi");

    out = out.replace(
      re,
      (m) =>
        `<span class="${h.className}">${m}</span>`
    );
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

  {
    id: "t2",

    title:
      "التوصيات الأربع و مستهدف سرعة البدء بالضغطات الصدرية",

    type: "pdf",

    pdfUrl: "/FourRecommendations.pdf",
  },
];

export default function Articles() {
  const [active, setActive] = useState({
    topic: 0,
    child: null,
  });

  const [zoom, setZoom] = useState(100);

  const [menuOpen, setMenuOpen] = useState(
    window.innerWidth >= 768
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(true);
      } else {
        setMenuOpen(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, []);

  const selectTopic = (topicIndex) => {
    const t = TOPICS[topicIndex];

    setActive({
      topic: topicIndex,
      child: Array.isArray(t.children)
        ? 0
        : null,
    });

    if (window.innerWidth < 768) {
      setMenuOpen(false);
    }
  };

  const selectChild = (
    topicIndex,
    childIndex
  ) => {
    setActive({
      topic: topicIndex,
      child: childIndex,
    });

    if (window.innerWidth < 768) {
      setMenuOpen(false);
    }
  };

  const zoomIn = () => {
    setZoom((z) => Math.min(220, z + 10));
  };

  const zoomOut = () => {
    setZoom((z) => Math.max(70, z - 10));
  };

  const zoomReset = () => {
    setZoom(100);
  };

  const topic = TOPICS[active.topic];

  const content =
    Array.isArray(topic.children) &&
    active.child !== null
      ? topic.children[active.child]
      : topic;

  const HIGHLIGHTS = [
    {
      text: "AQUA ASCENT",

      className:
        "text-[#2D2E8A] font-semibold",
    },

    {
      regex: /التزام عالي/gi,

      className:
        "bg-yellow-100 text-yellow-900 px-1 rounded",
    },

    {
      regex: /غير ملتزم/gi,

      className:
        "bg-red-100 text-red-800 px-1 rounded",
    },

    {
      regex: /(?:ال)?درج(?:ة|تان|ات)/g,

      className:
        "text-[#82181a] font-bold",
    },
  ];

  const styledMd =
    content.type === "pdf"
      ? ""
      : highlightToHtml(
          content.body ?? "",
          HIGHLIGHTS
        );

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-white overflow-x-hidden"
    >
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#82181a]">
            المحتوى المقروء
          </h1>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();

              setMenuOpen((prev) => !prev);
            }}
            className="md:hidden px-4 py-2 rounded-lg border shadow-sm text-sm relative z-[9999]"
            style={{
              borderColor: "#404040",
              color: "#404040",
              background: "#ffffff",
            }}
          >
            {menuOpen
              ? "إغلاق القائمة"
              : "فتح القائمة"}
          </button>
        </div>

        <div className="grid md:grid-cols-[20rem_1fr] gap-6">

          {/* Sidebar */}
          <aside className="relative">

            {/* Overlay */}
            {menuOpen && (
              <div
                className="fixed inset-0 bg-black/30 z-40 md:hidden"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  setMenuOpen(false);
                }}
              />
            )}

            {/* Menu */}
            <div
              className={[
                "bg-white border rounded-2xl shadow-sm",

                "md:relative md:translate-x-0 md:opacity-100 md:pointer-events-auto",

                "fixed top-0 right-0 h-full w-[85%] max-w-sm z-50 transition-all duration-300 overflow-y-auto",

                menuOpen
                  ? "translate-x-0 opacity-100 pointer-events-auto"
                  : "translate-x-full opacity-0 pointer-events-none",
              ].join(" ")}
              style={{
                borderColor: "#404040",
              }}
            >
              <div className="p-4">

                {/* Mobile Header */}
                <div className="flex items-center justify-between mb-4 md:hidden">
                  <h2
                    className="text-lg font-semibold"
                    style={{
                      color: "#404040",
                    }}
                  >
                    المقالات
                  </h2>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();

                      setMenuOpen(false);
                    }}
                    className="px-3 py-1 rounded-lg border text-sm"
                    style={{
                      borderColor: "#404040",
                      color: "#404040",
                    }}
                  >
                    ✕
                  </button>
                </div>

                <ul className="space-y-2">
                  {TOPICS.map((t, ti) => {
                    const isActive =
                      active.topic === ti;

                    const hasChildren =
                      Array.isArray(t.children);

                    return (
                      <li
                        key={t.id}
                        className="space-y-2"
                      >
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();

                            selectTopic(ti);
                          }}
                          className={[
                            "w-full text-right px-3 py-3 rounded-xl transition-colors",

                            "whitespace-normal break-words leading-6",

                            isActive &&
                            !hasChildren
                              ? "bg-[#2D2E8A] text-white"
                              : "hover:bg-gray-100 text-[#404040]",
                          ].join(" ")}
                        >
                          {t.title}
                        </button>

                        {hasChildren &&
                          isActive && (
                            <ul className="pr-4 space-y-1">
                              {t.children.map(
                                (c, ci) => {
                                  const selected =
                                    active.topic ===
                                      ti &&
                                    active.child ===
                                      ci;

                                  return (
                                    <li
                                      key={c.id}
                                    >
                                      <button
                                        type="button"
                                        onClick={(
                                          e
                                        ) => {
                                          e.preventDefault();
                                          e.stopPropagation();

                                          selectChild(
                                            ti,
                                            ci
                                          );
                                        }}
                                        className={[
                                          "w-full text-right px-3 py-2 rounded-lg transition-colors",

                                          "whitespace-normal break-words leading-6",

                                          selected
                                            ? "bg-[#2D2E8A] text-white"
                                            : "hover:bg-gray-100 text-[#404040]",
                                        ].join(
                                          " "
                                        )}
                                      >
                                        {
                                          c.title
                                        }
                                      </button>
                                    </li>
                                  );
                                }
                              )}
                            </ul>
                          )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </aside>

          {/* Content */}
          <section
            className="rounded-2xl border shadow-sm flex flex-col overflow-hidden"
            style={{
              background: "#ffffff",
              borderColor: "#404040",
            }}
          >
            {/* Top Bar */}
            <div
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b px-4 py-3"
              style={{
                borderColor: "#404040",
              }}
            >
              <div className="min-w-0">
                <h3
                  className={[
                    "font-semibold text-[#2D2E8A]",

                    "text-base sm:text-lg md:text-xl",

                    "whitespace-normal break-words",
                  ].join(" ")}
                >
                  {content.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#404040] whitespace-normal break-words">
                  {Array.isArray(
                    topic.children
                  )
                    ? topic.title
                    : "—"}
                </p>
              </div>

              {/* Zoom Controls */}
              <div className="flex items-center gap-2 shrink-0 flex-wrap">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    zoomOut();
                  }}
                  className="px-3 py-1 rounded-lg border"
                  style={{
                    borderColor: "#404040",
                    color: "#404040",
                  }}
                >
                  −
                </button>

                <span className="text-sm w-12 text-center text-[#404040]">
                  {zoom}%
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    zoomIn();
                  }}
                  className="px-3 py-1 rounded-lg border"
                  style={{
                    borderColor: "#404040",
                    color: "#404040",
                  }}
                >
                  +
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    zoomReset();
                  }}
                  className="px-3 py-1 rounded-lg border text-sm"
                  style={{
                    borderColor: "#404040",
                    color: "#404040",
                  }}
                >
                  إعادة
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div
              className={[
                "w-full",

                "px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32",

                "py-5",

                "break-words whitespace-normal",
              ].join(" ")}
              style={{
                ["--baseSize"]:
                  "clamp(1em, 0.95em + 0.5vw, 1.2em)",

                ["--zoom"]: zoom,

                fontSize:
                  "calc(var(--baseSize) * (var(--zoom) / 100))",

                color: "#404040",
              }}
            >
              <div className="prose prose-neutral max-w-none rtl">

                {content.type === "pdf" ? (
                  <iframe
                    src={content.pdfUrl}
                    className="w-full rounded-xl border"
                    style={{
                      height: "75vh",
                      borderColor: "#404040",
                    }}
                    title={content.title}
                  />
                ) : (
                  <ReactMarkdown
                    remarkPlugins={[
                      remarkGfm,
                    ]}
                    rehypePlugins={[
                      rehypeRaw,
                    ]}
                    components={{
                      h1: (props) => (
                        <h1
                          className="text-2xl md:text-3xl font-extrabold text-[#82181a] mb-4"
                          {...props}
                        />
                      ),

                      h2: (props) => (
                        <h2
                          className="text-xl md:text-2xl font-bold text-[#2D2E8A] mt-6 mb-3"
                          {...props}
                        />
                      ),

                      code: (props) => (
                        <code
                          className="px-1.5 py-0.5 rounded bg-gray-100"
                          {...props}
                        />
                      ),

                      li: (props) => (
                        <li
                          className="leading-7"
                          {...props}
                        />
                      ),
                    }}
                  >
                    {styledMd}
                  </ReactMarkdown>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
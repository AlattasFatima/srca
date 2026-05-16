import React, { useEffect, useRef, useState } from "react";

const MODULES = [
  {
    id: "v1",
    title: "توقف قلب أو تنفس المرتبط بإصابة",
    videoUrl: "/heartAttack.mp4",
  },

  {
    id: "v2",
    title: "الأعراض ذات الأولوية",
    videoUrl: "/symptoms.mp4",
  },

  {
    id: "v3",
    title: "الإستجواب الأمثل لطالب الخدمة الإسعافية",
    videoUrl: "/questioning.mp4",
  },

  {
    id: "v4",
    title: "معايير خدمات طالب الخدمة الإسعافية",
    videoUrl: "/standards.mp4",
  },

  {
    id: "v5",
    title: "أبرز البروتوكولات شيوعًا في موسم الحج",
    videoUrl: "/HajjProtocols.mp4",
  },

  {
    id: "v6",
    title: "سلامة مكان الحادثة",
    videoUrl: "/AccidentSiteSafety.mp4",
  },
];

const QUIZZES = {
  v1: {
    question:
      "عند ما يصرح متصل عن وجود مصاب تعرض لحادث دهس والان فاقد للوعي ولا يتنفس فإن بروتوكول الشكوى الرئيسية المناسب هو؟",

    options: [
      "9: توقف في القلب أو التنفس / موت",
      "29: تصادم مروري / حادث مواصلات",
      "30: إصابات (محددة)",
    ],

    correctIndex: 1,
  },

  v2: {
    question: "يعتبر جميع ما يلي عرضًا ذا أولوية عدا؟",

    options: [
      "مستوى متغير من الوعي",
      "تنفس غير طبيعي",
      "الم البطن",
    ],

    correctIndex: 2,
  },

  v3: {
    question:
      "أي مما يلي ليس من ضمن النقاط التي يجب تجنبها خلال كل مكالمة ؟",

    options: [
      "أ- السلوكيات المحظورة",
      "ب- خلق توقعات لا يمكن التحكم بها",
      "ج- اظهار التعاطف",
      "د- الثغرات",
    ],

    correctIndex: 2,
  },

  v4: {
    question:
      "سيصنف جميع ما يلي على انه أسلوب طرح خاطئ ماعدا:",

    options: [
      "أ- دمج السؤال بعبارة توضيحية",

      "ب - طرح كل سؤال من أسئلة البروتوكول بشكل منفرد مع الالتزام التام بالحفاظ على معناه كاملاً",

      "ج- دمج السؤال بسؤال اخر",

      "د- تضمين السؤال بإجابة",
    ],

    correctIndex: 1,
  },
};

const RESULTS_KEY = "emd_ep_quiz_results";
const COMPLETED_KEY = "emd_ep_video_completed";

export default function Videos() {
  const [active, setActive] = useState(0);

  const [menuOpen, setMenuOpen] = useState(
    window.innerWidth >= 768
  );

  const [quizOpen, setQuizOpen] = useState(false);

  const [selectedOption, setSelectedOption] =
    useState(null);

  const videoRef = useRef(null);

  const current = MODULES[active];

  const quiz = QUIZZES[current.id];

  const [results, setResults] = useState(() => {
    try {
      const raw = localStorage.getItem(RESULTS_KEY);

      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  const [completed, setCompleted] = useState(() => {
    try {
      const raw = localStorage.getItem(COMPLETED_KEY);

      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  const currentResult = results[current.id];

  const isCompletedOnce = Boolean(
    completed[current.id]
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

  useEffect(() => {
    localStorage.setItem(
      RESULTS_KEY,
      JSON.stringify(results)
    );
  }, [results]);

  useEffect(() => {
    localStorage.setItem(
      COMPLETED_KEY,
      JSON.stringify(completed)
    );
  }, [completed]);

  useEffect(() => {
    const v = videoRef.current;

    if (!v) return;

    const onEnded = () => {
      setSelectedOption(null);

      setQuizOpen(true);

      setCompleted((prev) => ({
        ...prev,
        [current.id]: true,
      }));
    };

    v.addEventListener("ended", onEnded);

    return () => {
      v.removeEventListener("ended", onEnded);
    };
  }, [current.id]);

  const onPickVideo = (index) => {
    setActive(index);

    setQuizOpen(false);

    setSelectedOption(null);

    if (window.innerWidth < 768) {
      setMenuOpen(false);
    }
  };

  const submitQuiz = () => {
    if (selectedOption === null || !quiz) return;

    const isCorrect =
      selectedOption === quiz.correctIndex;

    setResults((prev) => ({
      ...prev,

      [current.id]: {
        isCorrect,

        selected: selectedOption,

        ts: Date.now(),
      },
    }));
  };

  const retryInPlace = () => {
    setResults((prev) => {
      const copy = { ...prev };

      delete copy[current.id];

      return copy;
    });

    setSelectedOption(null);

    setQuizOpen(true);
  };

  const openQuizAfterCompleted = () => {
    if (!isCompletedOnce) return;

    retryInPlace();
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-white overflow-x-hidden"
    >
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#82181a]">
            المحتوى المرئي
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

          {/* القائمة */}
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

            <div
              className={[
                "bg-white border rounded-2xl shadow-sm",

                "md:relative md:translate-x-0 md:opacity-100 md:pointer-events-auto",

                "fixed top-0 right-0 h-full w-[85%] max-w-sm z-50 transition-all duration-300",

                menuOpen
                  ? "translate-x-0 opacity-100 pointer-events-auto"
                  : "translate-x-full opacity-0 pointer-events-none",
              ].join(" ")}
              style={{
                borderColor: "#404040",
              }}
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-4 md:hidden">
                  <h2
                    className="text-lg font-semibold"
                    style={{
                      color: "#404040",
                    }}
                  >
                    الفيديوهات
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
                  {MODULES.map((m, i) => {
                    const isActive = active === i;

                    const r = results[m.id];

                    return (
                      <li key={m.id}>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();

                            onPickVideo(i);
                          }}
                          className={[
                            "w-full text-right px-3 py-3 rounded-xl transition-colors",

                            "whitespace-normal break-words leading-6",

                            "flex items-center justify-between gap-2",

                            isActive
                              ? "bg-[#2D2E8A] text-white"
                              : "hover:bg-gray-100 text-[#404040]",
                          ].join(" ")}
                        >
                          <span>
                            {m.title}
                          </span>

                          {r && (
                            <span
                              className={
                                "text-[11px] px-2 py-0.5 rounded-full " +
                                (r.isCorrect
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700")
                              }
                            >
                              {r.isCorrect
                                ? "✓"
                                : "✗"}
                            </span>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </aside>

          {/* الفيديو */}
          <section
            className="rounded-2xl border shadow-sm flex flex-col overflow-hidden"
            style={{
              background: "#ffffff",
              borderColor: "#404040",
            }}
          >
            <div
              className="flex items-start sm:items-center justify-between gap-3 border-b px-4 py-3"
              style={{
                borderColor: "#404040",
              }}
            >
              <div className="min-w-0">
                <h3 className="font-semibold text-[#2D2E8A] text-lg">
                  {current.title}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  المحتوى المرئي
                </p>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  openQuizAfterCompleted();
                }}
                disabled={!isCompletedOnce}
                className={[
                  "text-sm px-3 py-2 rounded-lg border",

                  isCompletedOnce
                    ? "hover:bg-gray-50"
                    : "opacity-50 cursor-not-allowed",
                ].join(" ")}
                style={{
                  borderColor: "#404040",
                  color: "#404040",
                  background: "#ffffff",
                }}
              >
                إعادة الكويز
              </button>
            </div>

            <div className="w-full p-4 md:p-8">
              <video
                key={current.id}
                ref={videoRef}
                className="w-full rounded-xl"
                controls
                playsInline
                preload="metadata"
              >
                <source
                  src={current.videoUrl}
                  type="video/mp4"
                />

                Your browser does not support the video tag.
              </video>
            </div>
          </section>
        </div>
      </div>

      {/* Quiz */}
      {quizOpen && quiz && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
          
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setQuizOpen(false)}
          />

          <div className="relative w-full max-w-lg rounded-2xl border shadow-xl p-5 md:p-6 bg-white">
            
            <div className="flex items-start justify-between gap-3 mb-4">
              <h4 className="text-lg font-semibold text-[#2D2E8A]">
                Quiz
              </h4>

              <button
                type="button"
                onClick={() => setQuizOpen(false)}
                className="rounded-lg border px-3 py-1.5 text-sm hover:bg-gray-50"
                style={{
                  borderColor: "#404040",
                  color: "#404040",
                }}
              >
                إغلاق
              </button>
            </div>

            <div className="space-y-4">
              <p className="font-medium text-[#404040]">
                {quiz.question}
              </p>

              <div className="space-y-2">
                {quiz.options.map((opt, idx) => {
                  const checked =
                    selectedOption === idx;

                  return (
                    <label
                      key={idx}
                      className={[
                        "flex items-center gap-3 rounded-xl border px-3 py-2 cursor-pointer transition",

                        checked
                          ? "ring-1 ring-[#2D2E8A]"
                          : "hover:bg-gray-50",
                      ].join(" ")}
                    >
                      <input
                        type="radio"
                        name="quiz"
                        checked={checked}
                        onChange={() =>
                          setSelectedOption(idx)
                        }
                        disabled={Boolean(
                          currentResult
                        )}
                      />

                      <span>
                        {opt}
                      </span>
                    </label>
                  );
                })}
              </div>

              {!currentResult ? (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    submitQuiz();
                  }}
                  disabled={
                    selectedOption === null
                  }
                  className="w-full rounded-xl px-4 py-2.5 font-medium text-white"
                  style={{
                    background: "#2D2E8A",
                  }}
                >
                  إرسال الإجابة
                </button>
              ) : (
                <div className="space-y-3">
                  <div
                    className={
                      "w-full rounded-xl px-4 py-2.5 font-medium text-center " +
                      (currentResult.isCorrect
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800")
                    }
                  >
                    {currentResult.isCorrect
                      ? "إجابة صحيحة ✓"
                      : "إجابة غير صحيحة ✗"}
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setQuizOpen(false)
                      }
                      className="flex-1 rounded-xl px-4 py-2.5 border"
                      style={{
                        borderColor: "#404040",
                      }}
                    >
                      تم
                    </button>

                    <button
                      type="button"
                      onClick={retryInPlace}
                      className="flex-1 rounded-xl px-4 py-2.5 text-white"
                      style={{
                        background: "#2D2E8A",
                      }}
                    >
                      إعادة المحاولة
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
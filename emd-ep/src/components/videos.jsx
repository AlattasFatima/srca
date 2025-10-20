import React, { useEffect, useRef, useState } from "react";
import heartAttack from "../../public/heartAttack.mp4";
import symptoms from "../../public/symptoms.mp4";

const MODULES = [
  { id: "v1", title: "توقف قلب أو تنفس المرتبط بإصابة", videoUrl: heartAttack },
  { id: "v2", title: "الأعراض ذات الأولوية", videoUrl: symptoms },
];

/** عدّل الأسئلة هنا لكل فيديو */
const QUIZZES = {
  v1: {
    question: "عند ما يصرح متصل عن وجود مصاب تعرض لحادث دهس والان فاقد للوعي ولا يتنفس فإن بروتوكول الشكوى الرئيسية المناسب هو؟",
    options: ["9: توقف في القلب أو التنفس / موت", "29: تصادم مروري / حادث مواصلات", "30: إصابات (محددة)"],
    correctIndex: 1,
  },
  v2: {
    question: "يعتبر جميع ما يلي عرضًا ذا أولوية عدا؟",
    options: ["مستوى متغير من الوعي", "تنفس غير طبيعي", "الم البطن"],
    correctIndex: 2,
  },
};

const RESULTS_KEY = "emd_ep_quiz_results";
const COMPLETED_KEY = "emd_ep_video_completed";

export default function Videos() {
  const [active, setActive] = useState(0);
  const [menuOpen, setMenuOpen] = useState(true);
  const [quizOpen, setQuizOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  // نتائج الكويز لكل فيديو
  const [results, setResults] = useState(() => {
    try {
      const raw = localStorage.getItem(RESULTS_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  // اكتمال مشاهدة الفيديو لأول مرة (يسمح بفتح الكويز يدويًا بعد ذلك)
  const [completed, setCompleted] = useState(() => {
    try {
      const raw = localStorage.getItem(COMPLETED_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  const videoRef = useRef(null);
  const current = MODULES[active];
  const quiz = QUIZZES[current.id];
  const currentResult = results[current.id];
  const isCompletedOnce = Boolean(completed[current.id]);

  // فتح القائمة تلقائيًا على الشاشات الكبيرة
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(true);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // حفظ النتائج والاكتمال محليًا
  useEffect(() => {
    localStorage.setItem(RESULTS_KEY, JSON.stringify(results));
  }, [results]);

  useEffect(() => {
    localStorage.setItem(COMPLETED_KEY, JSON.stringify(completed));
  }, [completed]);

  // افتح الكويز تلقائيًا عند انتهاء الفيديو + سجّل أنه اكتمل لأول مرة
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onEnded = () => {
      setSelectedOption(null);
      setQuizOpen(true);
      setCompleted((c) => ({ ...c, [current.id]: true }));
    };
    v.addEventListener("ended", onEnded);
    return () => v.removeEventListener("ended", onEnded);
  }, [current.id]);

  // عند تغيير الفيديو: اقفل الكويز و صفّر الاختيار
  const onPickVideo = (i) => {
    setActive(i);
    setQuizOpen(false);
    setSelectedOption(null);
    if (window.innerWidth < 768) setMenuOpen(false);
  };

  const submitQuiz = () => {
    if (selectedOption === null || !quiz) return;
    const isCorrect = selectedOption === quiz.correctIndex;
    setResults((r) => ({ ...r, [current.id]: { isCorrect, selected: selectedOption, ts: Date.now() } }));
  };

  // إعادة المحاولة من داخل البوب-أب: امسح النتيجة وخلي البوب-أب مفتوح
  const retryInPlace = () => {
    setResults((r) => {
      const copy = { ...r };
      delete copy[current.id];
      return copy;
    });
    setSelectedOption(null);
    setQuizOpen(true);
  };

  // زر "إعادة الكويز" من الهيدر: امسح النتيجة وافتح البوب-أب (مسموح فقط بعد أول إنهاء للفيديو)
  const openQuizAfterCompleted = () => {
    if (!isCompletedOnce) return;
    retryInPlace();
  };

  return (
    <div dir="rtl" className="h-full bg-white">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-6">
        {/* العنوان والهامبرغر */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#82181a]">المحتوى المرئي</h1>
          <button
            onClick={() => setMenuOpen((s) => !s)}
            className="md:hidden px-4 py-2 rounded-lg border shadow-sm text-sm"
            style={{ borderColor: "#404040", color: "#404040", background: "#ffffff" }}
            aria-expanded={menuOpen}>
            {menuOpen ? "إغلاق القائمة" : "فتح القائمة"}
          </button>
        </div>

        <div className="grid md:grid-cols-[20rem_1fr] gap-6">
          {/* القائمة الجانبية */}
          <aside>
            <div
              className={[
                "rounded-2xl border shadow-sm overflow-hidden transition-all duration-300",
                menuOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0",
                "md:max-h-none md:opacity-100",
              ].join(" ")}
              style={{ background: "#ffffff", borderColor: "#404040" }}>
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-3" style={{ color: "#404040" }}>
                  الفيديوهات
                </h2>
                <ul className="space-y-2">
                  {MODULES.map((m, i) => {
                    const isActive = active === i;
                    const r = results[m.id];
                    const done = completed[m.id];
                    return (
                      <li key={m.id}>
                        <button
                          onClick={() => onPickVideo(i)}
                          className={[
                            "w-full text-right px-3 py-2 rounded-lg transition-colors whitespace-normal break-words leading-6 flex items-center justify-between gap-2",
                            isActive ? "bg-[#2D2E8A] text-white" : "hover:bg-gray-100 text-[#404040]",
                          ].join(" ")}>
                          <span className="truncate">{m.title}</span>
                          <span className="flex items-center gap-1">
                            {/* شارة نتيجة الكويز */}
                            {r && (
                              <span
                                className={
                                  "text-[11px] px-2 py-0.5 rounded-full " +
                                  (r.isCorrect ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700")
                                }>
                                {r.isCorrect ? "✓" : "✗"}
                              </span>
                            )}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </aside>

          {/* منطقة الفيديو */}
          <section
            className="rounded-2xl border shadow-sm flex flex-col overflow-visible"
            style={{ background: "#ffffff", borderColor: "#404040" }}>
            <div
              className="flex items-start sm:items-center justify-between gap-3 border-b px-4 py-3"
              style={{ borderColor: "#404040" }}>
              <div className="min-w-0">
                <h3 className="font-semibold text-[#2D2E8A] text-lg">{current.title}</h3>
                <p className="text-sm text-gray-500 mt-1">المحتوى المرئي</p>
              </div>

              {/* زر إعادة الكويز يظهر فقط بعد إكمال الفيديو لأول مرة */}
              <div className="flex items-center gap-2">
                <button
                  onClick={openQuizAfterCompleted}
                  disabled={!isCompletedOnce}
                  className={[
                    "text-sm px-3 py-2 rounded-lg border",
                    isCompletedOnce ? "hover:bg-gray-50" : "opacity-50 cursor-not-allowed",
                  ].join(" ")}
                  style={{ borderColor: "#404040", color: "#404040", background: "#ffffff" }}
                  title={isCompletedOnce ? "إعادة الكويز" : "شاهد الفيديو حتى النهاية أولًا"}>
                  إعادة الكويز
                </button>
              </div>
            </div>

            <div className="mx-4 sm:mx-6 md:mx-10 lg:mx-16 xl:mx-24 2xl:mx-32 py-5">
              {current.videoUrl && (
                <video key={current.id} ref={videoRef} width="100%" height="auto" controls>
                  <source src={current.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          </section>
        </div>
      </div>

      {/* نافذة الكويز (بوب-أب) */}
      {quizOpen && quiz && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="quiz-title">
          {/* الخلفية */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setQuizOpen(false)}
            aria-hidden="true"
          />
          {/* المحتوى */}
          <div className="relative w-full max-w-lg rounded-2xl border shadow-xl p-5 md:p-6 bg-white">
            <div className="flex items-start justify-between gap-3 mb-4">
              <h4 id="quiz-title" className="text-lg font-semibold text-[#2D2E8A]">
                Quiz
              </h4>
              <button
                onClick={() => setQuizOpen(false)}
                className="rounded-lg border px-3 py-1.5 text-sm hover:bg-gray-50"
                style={{ borderColor: "#404040", color: "#404040", background: "#ffffff" }}
                aria-label="إغلاق">
                إغلاق
              </button>
            </div>

            <div className="space-y-4">
              <p className="font-medium text-[#404040]">{quiz.question}</p>

              <div className="space-y-2">
                {quiz.options.map((opt, idx) => {
                  const checked = selectedOption === idx;
                  const isCorrectChoice = currentResult?.isCorrect && currentResult?.selected === idx;
                  const isWrongSelected = currentResult && !currentResult.isCorrect && currentResult.selected === idx;

                  return (
                    <label
                      key={idx}
                      className={[
                        "flex items-center gap-3 rounded-xl border px-3 py-2 cursor-pointer transition",
                        checked ? "ring-1 ring-[#2D2E8A]" : "hover:bg-gray-50",
                        isCorrectChoice ? "bg-green-50 border-green-300" : "",
                        isWrongSelected ? "bg-red-50 border-red-300" : "",
                      ].join(" ")}
                      style={{ borderColor: "#e5e7eb" }}>
                      <input
                        type="radio"
                        name="quiz"
                        className="h-4 w-4"
                        checked={checked}
                        onChange={() => setSelectedOption(idx)}
                        disabled={Boolean(currentResult)}
                      />
                      <span className="text-[#404040]">{opt}</span>
                    </label>
                  );
                })}
              </div>

              {!currentResult ? (
                <button
                  onClick={submitQuiz}
                  disabled={selectedOption === null}
                  className={[
                    "w-full rounded-xl px-4 py-2.5 font-medium text-white",
                    selectedOption === null ? "opacity-60 cursor-not-allowed" : "hover:brightness-110",
                  ].join(" ")}
                  style={{ background: "#2D2E8A" }}>
                  إرسال الإجابة
                </button>
              ) : (
                <div className="space-y-3">
                  <div
                    className={
                      "w-full rounded-xl px-4 py-2.5 font-medium text-center " +
                      (currentResult.isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800")
                    }>
                    {currentResult.isCorrect ? "إجابة صحيحة ✓" : "إجابة غير صحيحة ✗"}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setQuizOpen(false)}
                      className="flex-1 rounded-xl px-4 py-2.5 border hover:bg-gray-50"
                      style={{ borderColor: "#404040", color: "#404040", background: "#ffffff" }}>
                      تم
                    </button>
                    <button
                      onClick={retryInPlace}
                      className="flex-1 rounded-xl px-4 py-2.5 text-white hover:brightness-110"
                      style={{ background: "#2D2E8A" }}
                      title="إعادة المحاولة بدون إعادة مشاهدة الفيديو">
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

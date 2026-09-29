import { useEffect, useState } from "react";

const SIMULATIONS = [
  {
    id: "simulation-1",
    title: "الخطة الفردية لتطوير مهارات المرحل الطبي لبلاغات توقف القلب والتنفس",
    videoUrl: "/simulations/IndiviualPlan.mp4",
    formUrl: "https://forms.gle/DTniM4X8WV1HdRUR8",
  },
  {
    id: "simulation-2",
    title: "تنفس غير متأكد منه",
    videoUrl: "/simulations/simulation2.mp4",
    formUrl: "https://forms.gle/RMJK5xnN5BsHfa1r7",
  },
];

export default function Simulations() {
  const [active, setActive] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [completed, setCompleted] = useState({});
  const current = SIMULATIONS[active];

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1280px)");
    const updateMenu = () => setMenuOpen(media.matches);
    updateMenu();
    media.addEventListener("change", updateMenu);
    return () => media.removeEventListener("change", updateMenu);
  }, []);

  useEffect(() => {
    const closeForNavMenu = () => setMenuOpen(false);
    window.addEventListener("emd:nav-menu-open", closeForNavMenu);
    return () => window.removeEventListener("emd:nav-menu-open", closeForNavMenu);
  }, []);

  const selectSimulation = (index) => {
    setActive(index);
    setFormOpen(false);
    if (window.innerWidth < 1280) setMenuOpen(false);
  };

  const finishVideo = () => {
    setMenuOpen(false);
    setCompleted((previous) => ({ ...previous, [current.id]: true }));
    setFormOpen(true);
  };

  return (
    <div dir="rtl" className="min-h-screen bg-white overflow-x-hidden">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-6">
        <div className="flex items-center justify-between gap-3 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#82181a]">المحاكاة</h1>
          <button
            type="button"
            onClick={() => {
              if (!menuOpen) window.dispatchEvent(new Event("emd:page-menu-open"));
              setMenuOpen((previous) => !previous);
            }}
            aria-expanded={menuOpen}
            aria-controls="simulation-list"
            className="xl:hidden shrink-0 px-4 py-2 rounded-lg border border-[#404040] text-[#404040] bg-white shadow-sm text-sm"
          >
            {menuOpen ? "إغلاق القائمة" : "فتح القائمة"}
          </button>
        </div>

        <div className="grid xl:grid-cols-[20rem_minmax(0,1fr)] gap-6">
          <aside className="relative">
            {menuOpen && (
              <button
                type="button"
                aria-label="إغلاق قائمة المحاكاة"
                className="fixed inset-0 bg-black/30 z-40 xl:hidden"
                onClick={() => setMenuOpen(false)}
              />
            )}
            <div
              id="simulation-list"
              className={`bg-white border border-[#404040] rounded-2xl shadow-sm xl:relative xl:translate-x-0 xl:opacity-100 xl:pointer-events-auto fixed top-[var(--site-header-height,9rem)] right-0 h-[calc(100dvh-var(--site-header-height,9rem))] xl:h-auto w-[85%] max-w-sm xl:w-full z-[60] overflow-y-auto transition-all duration-300 ${menuOpen ? "translate-x-0 opacity-100 pointer-events-auto" : "translate-x-full opacity-0 pointer-events-none"}`}
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-4 xl:hidden">
                  <h2 className="text-lg font-semibold text-[#404040]">المحاكاة</h2>
                  <button type="button" onClick={() => setMenuOpen(false)} aria-label="إغلاق القائمة" className="px-3 py-1 rounded-lg border border-[#404040] text-[#404040]">✕</button>
                </div>
                <ul className="space-y-2">
                  {SIMULATIONS.map((simulation, index) => (
                    <li key={simulation.id}>
                      <button
                        type="button"
                        onClick={() => selectSimulation(index)}
                        className={`w-full text-right px-3 py-3 rounded-xl transition-colors whitespace-normal break-words leading-6 flex items-center justify-between gap-2 ${active === index ? "bg-[#2D2E8A] text-white" : "hover:bg-gray-100 text-[#404040]"}`}
                      >
                        <span>{simulation.title}</span>
                        {completed[simulation.id] && <span aria-label="تمت مشاهدة الفيديو">✓</span>}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          <section className="min-w-0 rounded-2xl border border-[#404040] shadow-sm flex flex-col overflow-hidden bg-white">
            <div className="flex flex-wrap items-start sm:items-center justify-between gap-3 border-b border-[#404040] px-4 py-3">
              <div className="min-w-0">
                <h2 className="font-semibold text-[#2D2E8A] text-lg">{current.title}</h2>
                <p className="text-sm text-gray-500 mt-1">المحاكاة</p>
              </div>
              <button
                type="button"
                onClick={() => { setMenuOpen(false); setFormOpen(true); }}
                disabled={!completed[current.id]}
                className="text-sm px-3 py-2 rounded-lg border border-[#404040] text-[#404040] bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                رابط النموذج
              </button>
            </div>
            <div className="w-full p-4 md:p-8">
              <video key={current.id} className="w-full rounded-xl" controls playsInline preload="metadata" onEnded={finishVideo}>
                <source src={current.videoUrl} type="video/mp4" />
                متصفحك لا يدعم تشغيل الفيديو.
              </video>
            </div>
          </section>
        </div>
      </div>

      {formOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="simulation-form-title">
          <button type="button" aria-label="إغلاق النافذة" className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setFormOpen(false)} />
          <div className="relative w-full max-w-lg rounded-2xl border shadow-xl p-5 md:p-6 bg-white">
            <div className="flex items-start justify-between gap-3 mb-4">
              <h3 id="simulation-form-title" className="text-lg font-semibold text-[#2D2E8A]">{current.title}</h3>
              <button type="button" onClick={() => setFormOpen(false)} className="rounded-lg border border-[#404040] px-3 py-1.5 text-sm hover:bg-gray-50">إغلاق</button>
            </div>
            <p className="mb-4 text-[#404040]">انتهى المقطع، انتقل إلى النموذج الخاص بهذه المحاكاة.</p>
            <a href={current.formUrl} target="_blank" rel="noopener noreferrer" className="block w-full rounded-xl px-4 py-2.5 text-center font-medium text-white bg-[#2D2E8A] hover:bg-[#20216b]">فتح نموذج Google</a>
          </div>
        </div>
      )}
    </div>
  );
}

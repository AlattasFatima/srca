import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import Logo from "../../logo.png";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(true);
  const lastY = useRef(0);
  const navRef = useRef(null);

  // احسب ارتفاع النافبار وخزّنه في CSS var
  useEffect(() => {
    const setH = () => {
      if (navRef.current) {
        document.documentElement.style.setProperty("--nav-h", `${navRef.current.offsetHeight}px`);
      }
    };
    setH();
    window.addEventListener("resize", setH);
    return () => window.removeEventListener("resize", setH);
  }, []);

  // إخفاء/إظهار أثناء التمرير
  useEffect(() => {
    const onScroll = () => {
      if (open) { setShow(true); return; }
      const y = Math.max(window.scrollY, 0);
      if (y < 8) { setShow(true); lastY.current = y; return; }
      if (y > lastY.current + 6) setShow(false);     // نزول -> اخفاء
      else if (y < lastY.current - 6) setShow(true); // صعود -> اظهار
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  // اقفل المنيو بعد الضغط على أي رابط
  const closeMenu = () => setOpen(false);

  return (
    <nav
      ref={navRef}
      dir="rtl"
      className={`fixed inset-x-0 top-0 z-50 w-full border-b-[6px] border-gray-200/70
                  bg-white/90 backdrop-blur transition-transform duration-300
                  ${show ? "translate-y-0" : "-translate-y-full"}`}
      aria-label="التنقل الرئيسي"
    >
      <div className="mx-auto max-w-screen-xl px-5 md:px-8">
        {/* شريط علوي */}
        <div className="grid grid-cols-3 items-center gap-x-2 md:gap-x-4 py-5 md:py-6">
          {/* يمين: الرئيسية (ديسكتوب) + زر منيو (موبايل) */}
          <div className="flex items-center justify-self-start">
            <ul className="hidden md:flex flex-row-reverse items-center gap-3">
              <li>
                <NavLink
                  to="/"
                  className="inline-block rounded-xl px-4 py-2 text-base lg:text-lg font-medium text-red-900 hover:bg-gray-100 transition"
                >
                  الرئيسية
                </NavLink>
              </li>
            </ul>

            <button
              onClick={() => { setOpen(v => !v); setShow(true); }}
              className="md:hidden inline-flex items-center justify-center rounded-xl p-2 border text-red-900 hover:bg-gray-100 active:scale-[0.98] transition"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label="فتح/إغلاق القائمة"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                {open ? (
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* الوسط: الشعار */}
          <div className="justify-self-center">
            <img src={Logo} alt="Logo" className="h-14 md:h-16 lg:h-24 w-auto object-contain" />
          </div>

          {/* يسار: المرئي/المقروء (ديسكتوب) */}
          <div className="justify-self-end">
            <ul className="hidden md:flex flex-row-reverse items-center gap-4 lg:gap-6">
              <li>
                <NavLink
                  to="/articles"
                  className="inline-block rounded-xl px-4 py-2 text-base lg:text-lg font-medium text-red-900 hover:bg-gray-100 transition"
                >
                  المحتوى المقروء
                </NavLink>
              </li>
              <li>
                {/* انتبه: مسار الصفحة + الهاش */}
                <NavLink
                  to="/videos"
                  smooth
                  className="inline-block rounded-xl px-4 py-2 text-base lg:text-lg font-medium text-red-900 hover:bg-gray-100 transition"
                >
                  المحتوى المرئي
                </NavLink>
              </li>
              
            </ul>
          </div>
        </div>

        {/* قائمة الموبايل: absolute تحت النافبار + pointer-events-none عند الإغلاق */}
        <div
          id="mobile-menu"
          className={`md:hidden absolute inset-x-0 top-[var(--nav-h,6rem)]
                      transition-[max-height,opacity] duration-300
                      ${open ? "max-h-64 opacity-100 pointer-events-auto" : "max-h-0 opacity-0 pointer-events-none"}`}
        >
          <div className="mx-auto max-w-screen-xl px-5 md:px-8">
            <div className="rounded-2xl border bg-white shadow-md overflow-hidden">
              <nav className="grid grid-cols-1">
                <NavLink
                  to="/"
                  onClick={closeMenu}
                  className="block px-4 py-3 text-base font-medium text-red-900 hover:bg-gray-100 transition"
                >
                  الرئيسية
                </NavLink>

                <NavLink
                  to="/videos"
                  smooth
                  onClick={closeMenu}
                  className="block px-4 py-3 text-base font-medium text-red-900 hover:bg-gray-100 transition"
                >
                  المحتوى المرئي
                </NavLink>

                <NavLink
                  to="/articles"
                  onClick={closeMenu}
                  className="block px-4 py-3 text-base font-medium text-red-900 hover:bg-gray-100 transition"
                >
                  المحتوى المقروء
                </NavLink>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

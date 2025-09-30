// Navbar.jsx
import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import Logo from "../../public/logo.png";
import sraLogo from "../assets/srcaLogo.jpg";
import srcaLogo1 from "../assets/srcaLogo1.png";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(true);
  const lastY = useRef(0);
  const navRef = useRef(null);

  // Hide/show nav on scroll
  useEffect(() => {
    const onScroll = () => {
      if (open) { setShow(true); return; }
      const y = Math.max(window.scrollY, 0);
      if (y < 8) { setShow(true); lastY.current = y; return; }
      if (y > lastY.current + 6) setShow(false);
      else if (y < lastY.current - 6) setShow(true);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <nav ref={navRef} dir="rtl"
      className={`fixed inset-x-0 top-0 z-50 w-full border-b-[6px] border-red-800/80 bg-white/90 backdrop-blur transition-transform duration-300 ${
        show ? "translate-y-0" : "-translate-y-full"}`} aria-label="التنقل الرئيسي">
      <div className="max-w-screen-2xl w-full mx-auto px-5 md:px-8">
        <div className="flex items-center justify-between py-4 md:hidden">

  <button onClick={() => { setOpen(v => !v); setShow(true); }}
    className="inline-flex items-center justify-center rounded-xl p-2 border text-red-900 hover:bg-gray-100 active:scale-[0.98] transition order-2"
    aria-expanded={open}
    aria-controls="mobile-menu"
    aria-label="فتح/إغلاق القائمة" >
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      {open ? (
        <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      ) : (
        <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />)}
    </svg>
  </button>

  <div className="flex items-center gap-4 mx-auto order-1">
    <img src={sraLogo} className="h-16 w-auto" alt="SRCA" />
    <img src={Logo} className="h-16 w-auto object-contain" alt="EMD+EP" />
  </div>
</div>

        {/* desktop */}
        <div className="hidden md:grid md:grid-cols-7 items-center gap-x-4 py-5 font-semibold">
          <div className="flex items-center justify-center">
            <img src={srcaLogo1} className="h-8 lg:h-10 w-auto" alt="SRCA" />
          </div>
          <div className="flex items-center justify-center">
            <HashLink to="/#home" smooth
              className="inline-block rounded-xl px-3 py-2 text-lg text-red-900 hover:bg-gray-100 transition">
              الرئيسية
            </HashLink>
          </div>
          <div className="flex items-center justify-center">
            <HashLink to="/#about" smooth
              className="inline-block rounded-xl px-3 py-2 text-lg text-red-900 hover:bg-gray-100 transition">
              من نحن؟
            </HashLink>
          </div>
          <div className="flex items-center justify-center">
            <img src={Logo} className="h-16 lg:h-20 w-auto object-contain" />
          </div>
          <div className="flex items-center justify-center">
            <NavLink to="/articles"
              className="inline-block rounded-xl px-3 py-2 text-lg text-red-900 hover:bg-gray-100 transition">
              المحتوى المقروء
            </NavLink>
          </div>
          <div className="flex items-center justify-center">
            <NavLink to="/videos"
              className="inline-block rounded-xl px-3 py-2 text-lg text-red-900 hover:bg-gray-100 transition">
              المحتوى المرئي
            </NavLink>
          </div>
          <div className="flex items-center justify-center">
            <NavLink to="/login" aria-label="تسجيل الدخول" title="تسجيل الدخول"
              className="inline-flex items-center justify-center rounded-xl p-2 border text-red-900 hover:bg-gray-100 transition" >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M5.5 20a8.5 8.5 0 1113 0M12 12a4 4 0 100-8 4 4 0 000 8z" />
              </svg>
            </NavLink>
          </div>
        </div>

        {/* mobile */}
        <div id="mobile-menu"
          className={`md:hidden absolute inset-x-0 top-[var(--nav-h,6rem)] transition-[max-height,opacity] duration-300 ${
            open ? "max-h-96 opacity-100 pointer-events-auto" : "max-h-0 opacity-0 pointer-events-none" }`}>
          <div className="mx-auto max-w-screen-xl px-5">
            <div className="rounded-2xl border bg-white shadow-md overflow-hidden">
              <nav className="grid grid-cols-1">
                
                <HashLink to="/#home" smooth onClick={closeMenu}
                  className="block px-4 py-3 text-base font-medium text-red-900 hover:bg-gray-100 transition">
                  الرئيسـية
                </HashLink>
                <HashLink to="/#about" smooth onClick={closeMenu}
                  className="block px-4 py-3 text-base font-medium text-red-900 hover:bg-gray-100 transition" >
                  من نحن؟
                </HashLink>
                <NavLink to="/videos" onClick={closeMenu}
                  className="block px-4 py-3 text-base font-medium text-red-900 hover:bg-gray-100 transition" >
                  المحتوى المرئي
                </NavLink>
                <NavLink to="/articles" onClick={closeMenu}
                  className="block px-4 py-3 text-base font-medium text-red-900 hover:bg-gray-100 transition" >
                  المحتوى المقروء
                </NavLink>
                <NavLink
                  to="/login" onClick={closeMenu}
                  className="flex items-center gap-2 px-4 py-3 text-base font-semibold text-red-900 hover:bg-gray-100 transition border-t">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M5.5 20a8.5 8.5 0 1113 0M12 12a4 4 0 100-8 4 4 0 000 8z" />
                  </svg>
                  تسجيل الدخول
                </NavLink>
              </nav>
            </div>
          </div>
        </div>

        <div className="pb-4 text-center">
          <p className="text-[#2D2E8A] font-extrabold text-lg md:text-xl lg:text-2xl">
            Emergency Medical Dispatch Educational Platform
          </p>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

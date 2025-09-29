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
      if (open) {
        setShow(true);
        return;
      }
      const y = Math.max(window.scrollY, 0);
      if (y < 8) {
        setShow(true);
        lastY.current = y;
        return;
      }
      if (y > lastY.current + 6) setShow(false);
      else if (y < lastY.current - 6) setShow(true);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <nav
      ref={navRef}
      dir="rtl"
      className={`fixed inset-x-0 top-0 z-50 w-full border-b-[6px] border-red-800/80 bg-white/90 backdrop-blur transition-transform duration-300 ${
        show ? "translate-y-0" : "-translate-y-full"
      }`}
      aria-label="التنقل الرئيسي">
      <div className="mx-auto max-w-screen-2xl px-5 md:px-8">
        <div className="grid grid-col-2 md:grid-cols-3 items-center gap-x-2 md:gap-x-4 py-5 md:py-6 font-semibold">
          {/* Left / Mobile Menu (hidden on mobile, كما هو على md+) */}
          <div className="hidden md:flex items-center justify-self-start">
            <img src={srcaLogo1}
              className="justify-self-right flex flex-col items-right h-8 lg:h-10 w-auto px-1 lg:px-6"/>
            <ul className="hidden md:flex flex-row-reverse items-center gap-4 lg:gap-6">
              <li>
                <HashLink
                  to="/#about"
                  smooth
                  className="inline-block rounded-xl px-4 py-2 text-base lg:text-lg text-red-900 hover:bg-gray-100 transition">
                  من نحن؟
                </HashLink>
              </li>
              <li>
                <HashLink
                  to="/#home"
                  smooth
                  className="inline-block rounded-xl px-4 py-2 text-base lg:text-lg text-red-900 hover:bg-gray-100 transition">
                  الرئيسية
                </HashLink>
              </li>
            </ul>
            <button
              onClick={() => {
                setOpen((v) => !v);
                setShow(true);
              }}
              className="md:hidden inline-flex items-center justify-center rounded-xl p-2 border text-red-900 hover:bg-gray-100 active:scale-[0.98] transition"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label="فتح/إغلاق القائمة">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                {open ? (
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          <div className="justify-self-left flex flex-col items-left w-auto">

            <div className="md:hidden flex items-center justify-center gap-6">
              <div className="flex items-center gap-2">
                <img src={sraLogo} className="h-20 w-auto" />
                <img src={Logo} className="h-20 px-4 w-auto object-contain" />
              </div>
              <button
                onClick={() => {
                  setOpen((v) => !v);
                  setShow(true);
                }}
                className="inline-flex items-center justify-center rounded-xl p-2 border text-red-900 hover:bg-gray-100 active:scale-[0.98] transition"
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label="فتح/إغلاق القائمة">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  {open ? (
                    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>

            <img src={Logo} className="hidden md:block h-14 md:h-16 lg:h-24 w-auto object-contain" />

            <p className="text-center mt-4 text-[#2D2E8A] font-extrabold text-xl lg:text-2xl">
              Emergency Medical Dispatch Educational Platform
            </p>
          </div>

          <div className="justify-self-end flex items-center gap-4">
            <ul className="hidden md:flex flex-row-reverse items-center gap-4 lg:gap-6">
              <li>
                <NavLink
                  to="/articles"
                  className="inline-block rounded-xl px-4 py-2 text-base lg:text-lg text-red-900 hover:bg-gray-100 transition">
                  المحتوى المقروء
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/videos"
                  className="inline-block rounded-xl px-4 py-2 text-base lg:text-lg text-red-900 hover:bg-gray-100 transition">
                  المحتوى المرئي
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          className={`md:hidden ml-8 absolute inset-x-0 top-[var(--nav-h,6rem)] transition-[max-height,opacity] duration-300 ${
            open ? "max-h-64 opacity-100 pointer-events-auto" : "max-h-0 opacity-0 pointer-events-none"
          }`}>
          <div className="mx-auto max-w-screen-xl px-5 md:px-8">
            <div className="rounded-2xl border bg-white shadow-md overflow-hidden">
              <nav className="grid grid-cols-1">
                <HashLink
                  to="/#home"
                  smooth
                  onClick={closeMenu}
                  className="block px-4 py-3 text-base font-medium text-red-900 hover:bg-gray-100 transition">
                  الرئيسـية
                </HashLink>
                <HashLink
                  to="/#about"
                  smooth
                  onClick={closeMenu}
                  className="block px-4 py-3 text-base font-medium text-red-900 hover:bg-gray-100 transition">
                  من نحن؟
                </HashLink>
                <NavLink
                  to="/videos"
                  onClick={closeMenu}
                  className="block px-4 py-3 text-base font-medium text-red-900 hover:bg-gray-100 transition">
                  المحتوى المرئي
                </NavLink>
                <NavLink
                  to="/articles"
                  onClick={closeMenu}
                  className="block px-4 py-3 text-base font-medium text-red-900 hover:bg-gray-100 transition">
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

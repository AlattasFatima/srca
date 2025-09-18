// App.jsx
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/navbar";
import Home from "./components/home";
import Articles from "./components/articles";
import Videos from "./components/videos";
import AboutUs from "./components/aboutUs";
import Footer from "./components/footer";
import AOS from "aos";
import "aos/dist/aos.css";

function SlidingSections() {
  const location = useLocation();

  useEffect(() => { AOS.init(); }, []);
  useEffect(() => {
    const id = (location.hash || "").replace("#", "") || null;
    if (!id) return;
    const el = document.getElementById(id);
    if (!el) return;
    const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--nav-h")) || 96;
    const y = window.scrollY + el.getBoundingClientRect().top - navH + 1;
    window.scrollTo({ top: Math.max(y, 0), behavior: "smooth" });
  }, [location]);

  return (
    <div className="md:snap-y md:snap-mandatory">
      <section id="home" className="md:snap-start" style={{ scrollMarginTop: "var(--nav-h,6rem)" }}><Home /></section>
      <section id="about" className="md:snap-start" style={{ scrollMarginTop: "var(--nav-h,6rem)" }}><AboutUs /></section>
    </div>
  );
}

// Reusable wrapper: sticky footer at the bottom of the viewport
function StickyPage({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="pt-[var(--nav-h,6rem)] flex-1">{children}</main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<div className="pt-[var(--nav-h,6rem)]"><SlidingSections /></div>} />
        <Route path="/aboutUs" element={<div className="pt-[var(--nav-h,6rem)]"><SlidingSections /></div>} />

        {/* Sticky footer ONLY here */}
        <Route path="/articles" element={<StickyPage><Articles /></StickyPage>} />
        <Route path="/videos"   element={<StickyPage><Videos /></StickyPage>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

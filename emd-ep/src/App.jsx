// App.jsx
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import ProtectedRoute from "./components/protectedRoute";

import Navbar from "./components/navbar";
import Home from "./components/home";
import Articles from "./components/articles";
import Videos from "./components/videos";
import AboutUs from "./components/aboutUs";
import Login from "./components/login"
import Footer from "./components/footer";
import SuccessCases from "./components/successCases";
import Stories from "./components/stories";

import AOS from "aos";
import "aos/dist/aos.css";

// Handles scroll to sections based on hash
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
      <section id="home" className="md:snap-start" style={{ scrollMarginTop: "var(--nav-h,6rem)" }}>
        <Home />
      </section>
      <section id="about" className="md:snap-start" style={{ scrollMarginTop: "var(--nav-h,6rem)" }}>
        <AboutUs />
      </section>
    </div>
  );
}

// Sticky footer wrapper
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
    <HashRouter>
      <Navbar />
      <Routes>
        {/* Main page with sliding sections */}
        <Route path="/" element={<SlidingSections />} />
        <Route path="/aboutUs" element={<SlidingSections />} />

        {/* Pages with sticky footer */}

        {/* Protected pages */}
        <Route element={<ProtectedRoute />}>
  <Route
    path="/articles"
    element={
      <StickyPage>
        <Articles />
      </StickyPage>
    }
  />

  <Route
    path="/videos"
    element={
      <StickyPage>
        <Videos />
      </StickyPage>
    }
  />
</Route>

        <Route path="/login" element={<StickyPage><Login /></StickyPage> } />
        <Route path="/success-cases" element={<StickyPage><SuccessCases /></StickyPage>} />
        <Route path="/inspiring-stories" element={<StickyPage><Stories /></StickyPage>} />
      </Routes>

    </HashRouter>
  );
}

export default App;

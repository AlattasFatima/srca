import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/navbar";
import Home from "./components/home";
import Articles from "./components/articles";
import Videos from "./components/videos";
import AboutUs from "./components/aboutUs";
import AOS from "aos";
import "aos/dist/aos.css";  // Import AOS styles

function SlidingSections() {
  const location = useLocation();

  // Initialize AOS
  useEffect(() => {
    AOS.init();
  }, []);

  // Automatic scroll to hash
  useEffect(() => {
    const id = (location.hash || "").replace("#", "") || null;
    if (!id) return;
    const el = document.getElementById(id);
    if (!el) return;

    // Add margin top equal to navbar height so that it doesn't overlap with the title
    const navH =
      parseInt(
        getComputedStyle(document.documentElement).getPropertyValue("--nav-h")
      ) || 96; // fallback 6rem

    const rect = el.getBoundingClientRect();
    const y = window.scrollY + rect.top - navH + 1; // +1 to prevent sticking
    window.scrollTo({ top: Math.max(y, 0), behavior: "smooth" });
  }, [location]);

  return (
    // Snap scrolling effect for sliding sections
    <div className="md:snap-y md:snap-mandatory">
      <section
        id="home"
        className="md:snap-start"
        style={{ scrollMarginTop: "var(--nav-h,6rem)" }}>
        <Home />
      </section>

      <section
        id="about"
        className="md:snap-start"
        style={{ scrollMarginTop: "var(--nav-h,6rem)" }}>
        <AboutUs />
      </section>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      {/* Space at the top to compensate for the sticky navbar */}
      <main className="pt-[var(--nav-h,6rem)]">
        <Routes>
          {/* Both paths display the same content (Home + About), but each is a "page" in the router */}
          <Route path="/" element={<SlidingSections />} />
          <Route path="/aboutUs" element={<SlidingSections />} />

          {/* Independent pages as requested */}
          <Route path="/articles" element={<Articles />} />
          <Route path="/videos" element={<Videos />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;

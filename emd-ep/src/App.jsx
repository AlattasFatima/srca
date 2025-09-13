import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/navbar";
import Home from "./components/home";
import Articles from "./components/articles";
import Videos from "./components/videos";
import AboutUs from "./components/aboutUs";

function SlidingSections() {
  const location = useLocation();

  // سكرول تلقائي للهاش (/#home أو /#about) مع مراعاة ارتفاع النافبار
  useEffect(() => {
    const id = (location.hash || "").replace("#", "") || null;
    if (!id) return;
    const el = document.getElementById(id);
    if (!el) return;

    // نضيف margin top يساوي ارتفاع النافبار عشان ما يغطي العنوان
    const navH =
      parseInt(
        getComputedStyle(document.documentElement).getPropertyValue("--nav-h")
      ) || 96; // fallback 6rem

    const rect = el.getBoundingClientRect();
    const y = window.scrollY + rect.top - navH + 1; // +1 عشان ما يلتصق تمامًا
    window.scrollTo({ top: Math.max(y, 0), behavior: "smooth" });
  }, [location]);

  return (
    // نخلي السكرول على صفحة وحدة — ونستخدم scroll-snap لإحساس "sliding"
    <div className="md:snap-y md:snap-mandatory">
      <section
        id="home"
        className="md:snap-start"
        style={{ scrollMarginTop: "var(--nav-h,6rem)" }}
      >
        <Home />
      </section>

      <section
        id="about"
        className="md:snap-start"
        style={{ scrollMarginTop: "var(--nav-h,6rem)" }}
      >
        <AboutUs />
      </section>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      {/* مسافة أعلى تعوّض النافبار الثابت */}
      <main className="pt-[var(--nav-h,6rem)]">
        <Routes>
          {/* كلا المسارين يعرضوا نفس العرض (Home + About) بس كل واحد باقي كـ "صفحة" في الراوتر */}
          <Route path="/" element={<SlidingSections />} />
          <Route path="/aboutUs" element={<SlidingSections />} />

          {/* صفحات مستقلة كما طلبت */}
          <Route path="/articles" element={<Articles />} />
          <Route path="/videos" element={<Videos />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;

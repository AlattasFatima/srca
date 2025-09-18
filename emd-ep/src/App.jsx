import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/navbar";
import Home from "./components/home";
import Articles from "./components/articles";
import Videos from "./components/videos";
import AboutUs from "./components/aboutUs";
import Footer from "./components/footer";
import AOS from "aos";
import "aos/dist/aos.css";

// ---------------------------
// سكشنات الهوم + اباوت مع سناپ وسكرول هاش
// ---------------------------
function SlidingSections() {
  const location = useLocation();

  // فعّل AOS مرة وحدة
  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  // لو تغيّر الهاش، انزل للقسم مع مراعاة ارتفاع النافبار
  useEffect(() => {
    const id = (location.hash || "").replace("#", "") || null;
    if (!id) return;
    const el = document.getElementById(id);
    if (!el) return;
    const navH =
      parseInt(
        getComputedStyle(document.documentElement).getPropertyValue("--nav-h")
      ) || 96;
    const y = window.scrollY + el.getBoundingClientRect().top - navH + 1;
    window.scrollTo({ top: Math.max(y, 0), behavior: "smooth" });
    // حدّث AOS بعد التنقل
    AOS.refresh();
  }, [location]);

  return (
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

// ---------------------------
// غلاف لصفحات يكون فيها فوتر لاصق + شاشة ثابتة بدون سكرول
// ---------------------------
// المبدأ: نخلي الصفحة كلها h-screen + Grid صفين:
// الصف الأول: المحتوى
// الصف الثاني: الفوتر بارتفاع ثابت h-20 (عدّليه إذا فوترِك أكبر/أصغر)
function StickyPage({ children }) {
  return (
    <div
      className="
        h-screen grid 
        grid-rows-[1fr_auto] 
        overflow-hidden
      "
    >
      {/* المساحة العلوية: المحتوى، مع فراغ أعلى يساوي ارتفاع النافبار */}
      <main
        className="
          pt-[var(--nav-h,6rem)]
          overflow-hidden
        "
      >
        {/* إذا حابة تمنعي أي سكرول داخلي حتى للمكوّنات، خليه بدون overflow-auto */}
        {/* لو تبغي تسمحي بسكرول داخل المحتوى (مو الصفحة)، استخدمي overflow-auto هنا بدل hidden */}
        {children}
      </main>

      {/* الفوتر ثابت بارتفاع محدد — تأكدي Footer نفسه ما يعطي ارتفاع مختلف كبير */}
      <div className="h-20">
        <Footer />
      </div>
    </div>
  );
}

// ---------------------------
// الغلاف الافتراضي للصفحات العادية (بدون Sticky footer)
// ---------------------------
function NormalPage({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="pt-[var(--nav-h,6rem)] flex-1">{children}</main>
    </div>
  );
}

// ---------------------------
// التطبيق الرئيسي
// HashRouter مناسب لـ GitHub Pages
// ---------------------------
function App() {
  return (
    <HashRouter>
      <Navbar />

      <Routes>
        {/* الصفحة الرئيسية وأقسام السحب */}
        <Route
          path="/"
          element={
            <NormalPage>
              <SlidingSections />
            </NormalPage>
          }
        />
        {/* مسار مباشر لنبذة (لو تبغي صفحة منفصلة غير سكشن، استخدمي <AboutUs /> هنا) */}
        <Route
          path="/aboutUs"
          element={
            <NormalPage>
              <SlidingSections />
            </NormalPage>
          }
        />

        {/* Sticky footer فقط هنا */}
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

        {/* مسار احتياطي */}
        <Route
          path="*"
          element={
            <NormalPage>
              <SlidingSections />
            </NormalPage>
          }
        />
      </Routes>
    </HashRouter>
  );
}

export default App;

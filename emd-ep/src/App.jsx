import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./components/home";
import Articles from "./components/articles";
import Videos from "./components/videos";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="pt-[var(--nav-h,6rem)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/videos" element={<Videos />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;

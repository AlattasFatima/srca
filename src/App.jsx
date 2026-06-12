function App() {
  return (
    <HashRouter>
      <Navbar />
      <Routes>
        {/* صفحة اللوجن مفتوحة للجميع */}
        <Route path="/login" element={<StickyPage><Login /></StickyPage>} />

        {/* كل الموقع محمي */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<SlidingSections />} />
          <Route path="/aboutUs" element={<SlidingSections />} />
          <Route path="/articles" element={<StickyPage><Articles /></StickyPage>} />
          <Route path="/videos" element={<StickyPage><Videos /></StickyPage>} />
          <Route path="/success-cases" element={<StickyPage><SuccessCases /></StickyPage>} />
          <Route path="/inspiring-stories" element={<StickyPage><Stories /></StickyPage>} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
export default App;
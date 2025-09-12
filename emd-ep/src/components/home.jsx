function Home() {
  return (
    <div id="home"
        className="w-[100%] md:w-[70%] lg:w-[50%] h-screen flex items-center">
      <section className="flex flex-col gap-6 w-16 md:w-16 lg:w-16 border-4">
        <h1 className="text-center text-4xl font-bold">
          أهلاً بكم في منصتكم التعليمية للمرحل الطبي
        </h1>
        <p className="text-center text-xl">
          {" "}
          منصة وجدرت لتكون أحد مصادر المعرفة والتطوير، وتجمع بين كيفية التعامل مع البروتوكولات
          الطبية ومهارات التواصل، لتدعمكم في أداء رسالتكم الإنسانية بأعلى جهد وكفاءة.
        </p>
      </section>
    </div>
  );
}

export default Home;
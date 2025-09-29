import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [touchedPwd, setTouchedPwd] = useState(false);

  const isPwdShort = password.length > 0 && password.length < 8;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.length < 8) {
      setTouchedPwd(true);
      return;
    }
    navigate("/articles");
  };

  return (
    <div id="login"
      className="relative min-h-[70vh] w-full flex items-center justify-center bg-gray-50 mt-8 pb-24">
      <div className="w-11/12 max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-center text-2xl md:text-3xl font-extrabold text-[#2D2E8A] mb-6">
          تسجيل الدخول
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit} dir="rtl">

          <div className="text-right">
            <label htmlFor="username"
              className="block text-sm font-medium text-neutral-700 mb-1">
              أدخل ايميلك
            </label>
            <input
              type="text"
              id="username"
              placeholder="e.g: name@SRCA.ORG.SA"
              className="w-full rounded-xl border px-4 py-2 text-neutral-700 focus:outline-none focus:ring-2 focus:ring-[#2D2E8A]/60"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"/>
          </div>

          <div className="text-right">
            <label htmlFor="password"
              className="block text-sm font-medium text-neutral-700 mb-1">
              كلمة المرور
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              className={`w-full rounded-xl border px-4 py-2 text-neutral-700 focus:outline-none focus:ring-2 ${
                touchedPwd && isPwdShort
                  ? "border-red-500 focus:ring-red-400"
                  : "focus:ring-[#2D2E8A]/60"
              }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setTouchedPwd(true)}
              autoComplete="current-password"
              aria-invalid={touchedPwd && isPwdShort}
              aria-describedby="password-help"
            />
            {touchedPwd && isPwdShort && (
              <p id="password-help" className="mt-2 text-sm text-red-600">
                تنبيه: الحد الأدنى لطول كلمة المرور هو <span className="font-bold">8 أحرف</span>.
              </p>
            )}
          </div>

          <button type="submit"
            className="w-full rounded-xl bg-[#2D2E8A] text-white font-bold py-2 hover:bg-[#26276f] transition">
            دخول
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

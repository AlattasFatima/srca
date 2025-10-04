import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [touchedPwd, setTouchedPwd] = useState(false);
  const [touchedEmail, setTouchedEmail] = useState(false);
  const [error, setError] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  const allowedDomain = "@srca.org.sa";

  const normalizedEmail = username.trim().toLowerCase();
  const isPwdShort = password.length > 0 && password.length < 8;

  // فحص إيميل بسيط + الدومين
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const looksLikeEmail = emailPattern.test(normalizedEmail);
  const hasAllowedDomain = normalizedEmail.endsWith(allowedDomain);
  const emailError =
    normalizedEmail.length === 0
      ? "يرجى إدخال البريد الإلكتروني"
      : !looksLikeEmail
      ? "صيغة البريد غير صحيحة"
      : !hasAllowedDomain
      ? `الإيميلات المسموح بها يجب أن تنتهي بـ ${allowedDomain}`
      : "";

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // لمس الحقول لعرض الأخطاء إن وجدت
    setTouchedEmail(true);
    setTouchedPwd(true);

    if (emailError) {
      setError(emailError);
      return;
    }
    if (isPwdShort || password.length === 0) {
      setError("كلمة المرور يجب أن تكون 8 أحرف فأكثر");
      return;
    }

    navigate("/articles");
  };

  return (
    <div id="login" className="relative min-h-[70vh] w-full flex items-center justify-center bg-gray-50 mt-8 pb-24">
      <div className="w-11/12 max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-center text-2xl md:text-3xl font-extrabold text-[#2D2E8A] mb-6">تسجيل الدخول</h2>

        <form className="space-y-5" onSubmit={handleSubmit} dir="rtl" noValidate>
          <div className="text-right">
            <label htmlFor="username" className="block text-sm font-medium text-neutral-700 mb-1">أدخل بريدك الوظيفي</label>
            
            <input type="email" id="username"
              placeholder={`name${allowedDomain}`}
              className={[ "w-full rounded-xl border px-4 py-2 text-neutral-700 focus:outline-none focus:ring-2",
                touchedEmail && emailError ? "border-red-500 focus:ring-red-400" : "focus:ring-[#2D2E8A]/60",
              ].join(" ")}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={() => setTouchedEmail(true)}
              autoComplete="username"
              inputMode="email"
              onKeyDown={(e) => {
                if (e.key === " ") e.preventDefault();
              }}
              aria-invalid={Boolean(touchedEmail && emailError)}
              aria-describedby="email-help" />

            <div id="email-help" className="mt-2 text-xs text-neutral-600">
              يجب أن ينتهي بريدك بـ <span className="font-semibold text-[#2D2E8A]">{allowedDomain}</span>
            </div>
            {touchedEmail && emailError && <p className="mt-2 text-sm text-red-600">{emailError}</p>}
          </div>

          <div className="text-right">
            <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-1">كلمة المرور</label>
            <div className="relative">
              
              <input type={showPwd ? "text" : "password"}
                id="password"
                placeholder="••••••••"
                className={[
                  "w-full rounded-xl border pl-4 pr-12 py-2 text-neutral-700 focus:outline-none focus:ring-2",
                  touchedPwd && isPwdShort ? "border-red-500 focus:ring-red-400" : "focus:ring-[#2D2E8A]/60",
                ].join(" ")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setTouchedPwd(true)}
                autoComplete="current-password"
                aria-invalid={Boolean(touchedPwd && isPwdShort)}
                aria-describedby="password-help"/>

              <button type="button"
                onClick={() => setShowPwd((s) => !s)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#2D2E8A] hover:underline"
                aria-label={showPwd ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}>
                {showPwd ? "إخفاء" : "إظهار"}
              </button>

            </div>

            {touchedPwd && isPwdShort && (
              <p id="password-help" className="mt-2 text-sm text-red-600">
                تنبيه: الحد الأدنى لطول كلمة المرور هو <span className="font-bold">8 أحرف</span>.
              </p>
            )}
          </div>

          {error && <p className="text-sm text-red-600 text-center font-medium">{error}</p>}

          <button type="submit"
            className="w-full rounded-xl bg-[#2D2E8A] text-white font-bold py-2 hover:bg-[#26276f] transition disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={Boolean(emailError) || isPwdShort}>
            دخول
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

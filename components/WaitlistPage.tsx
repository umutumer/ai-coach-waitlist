"use client";

import Image from "next/image";
import { useState } from "react";

export default function WaitlistPage() {
  // Form verilerini tutan state
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  // İstek durumunu yöneten state (idle, loading, success, error)
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Input değişikliklerini yakalama
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Form gönderme işlemi
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
      setStatus("error");
      setErrorMessage("API URL yapılandırılmamış.");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/waiting/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ first_name: "", last_name: "", email: "" });
      } else {
        const errorData = await response.json().catch(() => ({}));
        setStatus("error");
        setErrorMessage(errorData.detail || "Kayıt sırasında bir hata oluştu.");
        
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage("Sunucuya bağlanılamadı. Lütfen daha sonra tekrar deneyin.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 font-sans text-slate-800">
      
      {/* Üst Logo / Marka Alanı */}
      <div className="mb-10 flex flex-col items-center animate-fade-in-down">
        {/* Logo Placeholder: Buraya kendi SVG logonuzu veya resminizi koyabilirsiniz */}
        <div className="relative w-75 h-75 overflow-hidden">
          <Image
            src="/ai-coach-logo.png"
            alt="AI Koçum Logo"
            width={300}
            height={300}
            className="scale-[1.20] transition-transform duration-700"
          />
        </div>
      </div>

      <div className="w-full max-w-md bg-white">
        
        {/* Başlık Bölümü */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-3">
            Potansiyelini <span className="text-blue-500">AI Koçum</span> ile Keşfet
          </h1>
        </div>

        {/* Başarı Mesajı */}
        {status === "success" ? (
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8 text-center animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Aramıza Hoş Geldin!</h3>
            <p className="text-slate-600 mb-6">
              AI Koçum bekleme listesindeki yerini ayırdık. Platform açıldığında sana özel bir davetiye göndereceğiz.
            </p>
            <button 
              onClick={() => setStatus("idle")}
              className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              ← Başka bir e-posta kaydet
            </button>
          </div>
        ) : (
          /* Form Alanı */
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex gap-4">
              <div className="w-1/2">
                <label htmlFor="first_name" className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Adın
                </label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  required
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder="Örn: Umut"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-slate-400"
                />
              </div>
              <div className="w-1/2">
                <label htmlFor="last_name" className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Soyadın
                </label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  required
                  value={formData.last_name}
                  onChange={handleChange}
                  placeholder="Örn: Tümer"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1.5">
                E-posta Adresin
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="umut@ornek.com"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-slate-400"
              />
            </div>

            {/* Hata Mesajı */}
            {status === "error" && (
              <div className="bg-red-50 text-red-600 text-sm p-4 rounded-xl border border-red-100 flex items-start gap-3">
                <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>{errorMessage}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              {status === "loading" ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Kaydediliyor...
                </>
              ) : (
                "Erken Erişime Katıl"
              )}
            </button>
            
            <p className="text-center text-xs text-slate-400 mt-6">
              © {new Date().getFullYear()} AI Koçum. Geleceğini şimdiden tasarla.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
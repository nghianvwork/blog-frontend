"use client";

import React, { useState,useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const data =
      typeof window !== "undefined" &&
      (localStorage.getItem("user-info") || sessionStorage.getItem("user-info"));
    if (data) {
      try {
        const u = JSON.parse(data as string);
        if (u && (u.id || u.email || u.name)) {
          router.replace("/"); 
        }
      } catch {}
    }
  }, [router]);
  const API_URL = "http://localhost:4000/api/v1/auth/login"; 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ email, password }),
    });

  
    const text = await res.text();
    let json: any = null;
    try {
      json = text ? JSON.parse(text) : null;
    } catch {
      
      json = { message: text };
    }

    if (!res.ok) {
     
      alert(json?.message || `Đăng nhập thất bại (status ${res.status})`);
      return;
    }

    
  
if (json?.token) {
  const isLocal = typeof window !== "undefined" && window.location.hostname === "localhost";
  const cookieOpts = isLocal ? `path=/; max-age=3600; SameSite=Lax` : `path=/; max-age=3600; Secure; SameSite=Lax`;
  document.cookie = `token=${encodeURIComponent(json.token)}; ${cookieOpts}`;
}


  if (json?.user) {
  localStorage.setItem("user-info", JSON.stringify(json.user));
} else {
  localStorage.setItem("user-info", JSON.stringify(json));
}

window.dispatchEvent(new CustomEvent("user-changed", { detail: { user: json?.user ?? json } }));

    alert("Đăng nhập thành công!");
    router.push("/");
  } catch (err) {
    console.error(err);
    alert("Có lỗi xảy ra, thử lại sau.");
  } finally {
    setLoading(false);
  }
};

  return (
 

 
    <main className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow-sm" style={{ width: "100%", maxWidth: "400px" }}>
        <div className="card-body">
          <h3 className="text-center mb-4">Đăng nhập</h3>

          <form onSubmit={handleSubmit}>
          
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="form-control"
                placeholder="Nhập email"
                required
              />
            </div>

        
            <div className="mb-3">
              <label className="form-label">Mật khẩu</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="form-control"
                placeholder="Nhập mật khẩu"
                required
              />
            </div>

           
            <div className="d-grid">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Đang đăng nhập..." : "Đăng nhập"}
              </button>
            </div>
          </form>

         
          <p className="text-center mt-3 mb-0">
            Chưa có tài khoản? <a href="/register">Đăng ký</a>
          </p>
        </div>
      </div>
    </main>
  );
}

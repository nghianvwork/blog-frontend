"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import "bootstrap/dist/css/bootstrap.min.css";


export default function Header() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
  const loadUser = () => {
    const data = localStorage.getItem("user-info") || sessionStorage.getItem("user-info");
    try {
      setUser(data ? JSON.parse(data) : null);
    } catch (err) {
      console.error("parse user-info failed", err);
      setUser(null);
    }
  };

  loadUser();

  const onStorage = (e: StorageEvent) => {
    loadUser();
  };
  const onUserChanged = (e: Event) => {
    loadUser();
  };

  window.addEventListener("storage", onStorage); 
  window.addEventListener("user-changed", onUserChanged as EventListener);

  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener("user-changed", onUserChanged as EventListener);
  };
}, []);
  const handleLogout = () => {
    localStorage.removeItem("user-info");
    sessionStorage.removeItem("user-info");
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" href="/">
          Blog Frontend
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" href="/">
                    Trang chủ
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/users/profile">
                    Hồ sơ cá nhân
                  </Link>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLogout();
                    }}
                  >
                    Đăng xuất
                  </a>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" href="/login">
                    Đăng nhập
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/register">
                    Đăng ký
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

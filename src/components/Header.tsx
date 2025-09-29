"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function Header() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const data =
      localStorage.getItem("user-info") ||
      sessionStorage.getItem("user-info");
    if (data) {
      setUser(JSON.parse(data));
    }
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
          NghiaNV Blog
        </Link>

       
       

       
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {user ? (
         
             <nav className="navbar navbar-expand-lg navbar-light bg-light">
 
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
      <li className="nav-item active">
        <a className="nav-link navbar-light" href="/">Trang chủ </a>
      </li>
      
      <li className="nav-item">
        <a className="nav-link" href="/users/profile">Hồ sơ cá nhân</a>
      </li>
      <li className="nav-item">
        <a className="nav-link"  onClick={handleLogout}>Đăng Xuất</a>
      </li>
     
    </ul>
  </div>
</nav>
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

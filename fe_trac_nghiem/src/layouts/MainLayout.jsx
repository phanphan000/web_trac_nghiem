import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import "../index.css";

const MainLayout = ({ isLoggedIn, onLogin, onLogout, onRegisterClick }) => {
  return (
    <div>
      <Header
        isLoggedIn={isLoggedIn}
        onLogin={onLogin}
        onLogout={onLogout}
        onRegisterClick={onRegisterClick}
      />
      <main className="min-h-screen  bg-[var(--color-background)]">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;

import React from "react";
import { Outlet } from "react-router";
import NavbarLayout from "./NavbarLayout";
import FooterLayout from "./FooterLayout";
import "../styles/mainlayout.css";

export default function MainLayout() {
  return (
    <div className="layout-container">
      <NavbarLayout />
      <main className="layout-content">
        <Outlet />
      </main>
      <FooterLayout />
    </div>
  );
}

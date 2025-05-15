import React, { useEffect, useState } from "react";
import authService from "../utils/token";
import RoleSection from "../components/RoleSelection";
import { AdminSections } from "../components/AdminSections";
import "../styles/admin.css";

export default function AdminProfile() {
  const [user, setUser] = useState();
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const current_user = authService.getUserDataFromStorage();
    setUser(current_user.name);
    setUserRole(current_user.role);
  }, []);

  return (
    <>
      <section>
        <article className="arctile-user-admin">
          <h2>Hola, {user}</h2>
        </article>

        <RoleSection userRole={userRole} sections={AdminSections} />
      </section>
    </>
  );
}

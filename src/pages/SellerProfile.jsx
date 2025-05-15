import React, { useEffect, useState } from "react";
import RoleSection from "../components/RoleSelection";
import { SellerSections } from "../components/SellerSections";
import authService from "../utils/token";

export default function SellerProfile() {
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

        <RoleSection userRole={userRole} sections={SellerSections} />
      </section>
    </>
  );
}

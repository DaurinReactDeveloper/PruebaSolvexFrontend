import React, { useState } from "react";
import DefaultSection from "./DefaultSection";
import "../styles/rolesection.css";

export default function RoleSection({ userRole, sections }) {
  const [selectedSection, setSelectedSection] = useState(null);

  const handleSectionSelect = (sectionId) => {
    const section = sections.find((s) => s.id === sectionId);
    setSelectedSection(section ? section.component : null);
  };

  return (
    <div className="role-section">
      <div className="section-buttons">
        {sections.map((section) => (
          <button
            key={section.id}
            type="button"
            onClick={() => handleSectionSelect(section.id)}
          >
            {section.label}
          </button>
        ))}
      </div>

      <div className="section-content">
        {selectedSection ? selectedSection : <DefaultSection />}
      </div>
    </div>
  );
}

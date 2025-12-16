import { useState } from "react";
import "../styles/addProperty.css";
import { useNavigate } from "react-router-dom";


const AddProperty = () => {
  const [propertyName, setPropertyName] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();

  // All fields must be filled
  const isFormValid = propertyName.trim() !== "" && address.trim() !== "";

  return (
    <div className="add-property-page">
      <div className="property-wrapper">
        {/* Back */}
        <div className="back-link">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="back-icon"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Back</span>
        </div>

        {/* Card */}
        <div className="property-card">
          <div className="step-text">Step 1 of 3</div>

          <h2>Add Property</h2>
          <p className="subtitle-addproperty">
            Let's start by adding your first property or building
          </p>

          <div className="form-group">
            <label>
              Property/Building Name <span>*</span>
            </label>
            <input
              type="text"
              value={propertyName}
              onChange={(e) => setPropertyName(e.target.value)}
              placeholder="e.g., Downtown Plaza, Main Street Building"
            />
          </div>

          <div className="form-group">
            <label>Address (optional)</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="e.g., 123 Main Street, City, State ZIP"
            />
          </div>

          <div className="button-row">
            <button className="btn-skip">Skip</button>

            <button className="btn-continue" disabled={!isFormValid}
            onClick={() => navigate("/add-unit-suite")}
            >
              Continue →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProperty;

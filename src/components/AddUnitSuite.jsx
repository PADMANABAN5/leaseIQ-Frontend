import { useState } from "react";
import "../styles/addUnitSuite.css";

const AddUnitSuite = ({ data, setData, onBack, onNext }) => {
  const [unitNumber, setUnitNumber] = useState(data.unitNumber || "");
  const [tenantName, setTenantName] = useState(data.tenantName || "");
  const [squareFootage, setSquareFootage] = useState(data.squareFootage || "");

  // ALL required fields validation (same logic as before)
  const isFormValid = unitNumber.trim() !== "" && tenantName.trim() !== "";
  const handleContinue = () => {
    setData({
      unitNumber,
      tenantName,
      squareFootage,
    });

    onNext(); // move to Step 3
  };

  return (
    <div className="add-unit-page-background">
      <div className="unit-wrapper">

        {/* Back */}
        <div className="back-link" onClick={onBack}>
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
        <div className="unit-card">
          <div className="step-text">Step 2 of 3</div>

          <h2>Add Unit/Suite</h2>
          <p className="subtitle-addunitsuite">
            Add a unit or suite
          </p>

          <div className="form-group">
            <label>
              Unit/Suite Number <span>*</span>
            </label>
            <input
              type="text"
              value={unitNumber}
              onChange={(e) => setUnitNumber(e.target.value)}
              placeholder="e.g., Suite 200, Unit A, Floor 3"
            />
          </div>

          <div className="form-group">
            <label>Tenant Name <span>*</span></label>
            <input
              type="text"
              value={tenantName}
              onChange={(e) => setTenantName(e.target.value)}
              placeholder="e.g., ACME Corporation"
            />
          </div>

          <div className="form-group">
            <label>Square Footage (optional)</label>
            <input
              type="number"
              value={squareFootage}
              onChange={(e) => setSquareFootage(e.target.value)}
              placeholder="e.g., 2500"
            />
          </div>

          <div className="button-row">
            <button
              className="btn-continue"
              disabled={!isFormValid}
              onClick={handleContinue}
            >
              Continue →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUnitSuite;

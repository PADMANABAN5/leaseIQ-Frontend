import { useState } from "react";
import "../styles/uploadLease.css";
import { useNavigate } from "react-router-dom";

const UploadLease = () => {
  const [file, setFile] = useState(null);
  const [docType, setDocType] = useState("original");

  const isFormValid = file !== null && docType !== "";

  const navigate = useNavigate();

  return (
    <div className="upload-lease-page">
      <div className="upload-wrapper">
        {/* Back */}
        <div className="back-link">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
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
        <div className="upload-card">
          <div className="step-text">Step 3 of 3</div>

          <h2>Upload Lease</h2>
          <p className="subtitle-uploadlease">
            Upload lease document for <strong>dcsa - dsa</strong>
          </p>

          {/* Upload Box */}
          <label className="upload-box">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              hidden
              onChange={(e) => setFile(e.target.files[0])}
            />

            <div className="upload-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 16V4M12 4L7 9M12 4L17 9"
                  stroke="#5A3DF0"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4 20H20"
                  stroke="#5A3DF0"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <p className="upload-title">
              {file ? file.name : "Click to upload or drag and drop"}
            </p>
            <p className="upload-sub">PDF, DOC, or DOCX up to 50MB</p>
          </label>

          {/* Document Type */}
          <div className="doc-type">
            <p className="doc-label">Document Type</p>

            <label className="radio-row">
              <input
                type="radio"
                checked={docType === "original"}
                onChange={() => setDocType("original")}
              />
              Original Lease Agreement
            </label>

            <label className="radio-row">
              <input
                type="radio"
                checked={docType === "amendment"}
                onChange={() => setDocType("amendment")}
              />
              Amendment to existing lease
            </label>
          </div>

          {/* Buttons */}
          <div className="button-row">
            <button className="btn-cancel">Cancel</button>
            <button
              className={`btn-upload ${isFormValid ? "active" : ""}`}
              disabled={!isFormValid}
              onClick={() => navigate("/analyzing-lease")}
            >
              Upload &amp; Process →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadLease;

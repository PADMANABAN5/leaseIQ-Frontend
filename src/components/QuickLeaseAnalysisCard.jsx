import React from "react";
import "../styles/quickLease.css";


const QuickLeaseAnalysisCard = ({
  file,
  onFileChange,
  leaseName,
  onLeaseNameChange,
  onCancel,
  onSubmit,
  submitDisabled,
}) => {
  return (
    <div className="upload-card">
      <h2>Quick Lease Analysis</h2>
      <p className="subtitle-uploadlease">
        Upload your lease document to get started
      </p>

      {/* Upload Box */}
      <label className="upload-box">
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          hidden
          onChange={onFileChange}
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

      {/* Lease name */}
      <div className="lease-name">
        <label>Give this lease a name (optional)</label>
        <input
          type="text"
          placeholder="e.g. Downtown Office Lease"
          value={leaseName}
          onChange={(e) => onLeaseNameChange(e.target.value)}
        />
      </div>

      {/* Buttons */}
      <div className="button-row">
        <button className="btn-cancel" onClick={onCancel}>
          Cancel
        </button>

        <button
          className={`btn-upload ${!submitDisabled ? "active" : ""}`}
          disabled={submitDisabled}
          onClick={onSubmit}
        >
          Analyze Lease →
        </button>
      </div>
    </div>
  );
};

export default QuickLeaseAnalysisCard;

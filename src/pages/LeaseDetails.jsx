import "../styles/leaseDetails.css";
import {
  FiArrowLeft,
  FiMessageSquare,
  FiDownload,
  FiUpload,
  FiPlus,
  FiEdit,
} from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";

const LeaseDetails = () => {
  return (
    <div className="lease-page">
      {/* ===== FIXED HEADER ===== */}
      <header className="lease-header">
        <div className="header-left">
          <FiArrowLeft className="header-back" />
          <div className="header-text">
            <h1>Acme Corp - Lease Abstraction</h1>
            <p>Downtown Plaza · Suite 100</p>
          </div>
        </div>

        <div className="header-right">
          <button className="ai-btn">
            <FiMessageSquare />
            AI Assistant
          </button>
          <button className="ai-btn">
            <FiDownload />
          </button>
        </div>
      </header>

      {/* ===== BODY ===== */}
      <div className="lease-body">
        {/* SIDEBAR */}
        <aside className="lease-sidebar">
          <h4>Acme Corp</h4>
          <span className="muted">Document Library</span>

          <div className="upload-box">
            <FiUpload />
            <p>Drop PDF here or click to upload</p>
          </div>

          <div className="doc-list">
            <div className="doc-item active">
              bayer Lease Document
              <span>Lease · 12/8/2025</span>
            </div>
            <div className="doc-item">
              Amendment 1<span>Amendment · 1/8/2025</span>
            </div>
          </div>
        </aside>

        {/* CONTENT */}
        <main className="lease-content">
          {/* Tabs */}
          <div className="tabs">
            {[
              "Info",
              "Space",
              "Rent Schedules",
              "Provisions",
              "Audit",
              "CAM",
            ].map((tab, i) => (
              <button key={i} className={i === 0 ? "active" : ""}>
                {tab}
              </button>
            ))}
          </div>

          {/* ===== SCROLLABLE SECTION ===== */}
          <div className="scroll-section">
            {/* Overview */}
            <section className="overview">
              <div className="overview-card red">
                <span>Liabilities</span>
                <strong>Hidden</strong>
              </div>
              <div className="overview-card blue">
                <span>Key Dates</span>
                <strong>26</strong>
              </div>
              <div className="overview-card green">
                <span>Obligations</span>
                <strong>8</strong>
              </div>
              <div className="overview-card orange">
                <span>Key Terms</span>
                <strong>12</strong>
              </div>
            </section>

            {/* Lease Info */}
            <section className="card">
              <div className="card-header">
                <h3>Lease Information</h3>
                <button className="edit-btn">
                  <FiEdit /> Edit
                </button>
              </div>

              <div className="info-grid">
                <div>
                  <label>Lease</label>
                  <p>Commercial Lease Agreement</p>
                </div>
                <div>
                  <label>Property</label>
                  <p>Downtown Plaza - Suite 100</p>
                </div>
                <div>
                  <label>Property Address</label>
                  <p>123 Main Street, Downtown</p>
                </div>
                <div>
                  <label>Lease From</label>
                  <p>2022-01-01</p>
                </div>
                <div>
                  <label>Lease To</label>
                  <p>2025-12-31</p>
                </div>
                <div>
                  <label>Square Feet</label>
                  <p>5,000 sqft</p>
                </div>
                <div>
                  <label>Base Rent</label>
                  <p>$18,750 / month</p>
                </div>
                <div>
                  <label>Security Deposit</label>
                  <p>$37,500</p>
                </div>
              </div>
            </section>

            {/* Executive Summary */}
            <section className="card">
              <div className="card-header">
                <h3>Executive Summary</h3>
                <button className="add-btn">
                  <FiPlus /> Add Item
                </button>
              </div>

              <ul className="summary-list">
                {[
                  "Lease term: 4 years commencing January 1, 2022",
                  "Base rent: $45 per sqft annually, payable monthly",
                  "Annual rent escalation: 3%",
                  "Security deposit of $37,500",
                  "Tenant responsible for CAM expenses",
                  "Two renewal options of 5 years",
                ].map((item, index) => (
                  <li key={index} className="summary-item">
                    <span className="summary-text">{item}</span>
                    <span className="summary-actions">
                      <FiEdit />
                      <FiTrash2 />
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LeaseDetails;

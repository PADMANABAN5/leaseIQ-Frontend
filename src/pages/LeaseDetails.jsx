import "../styles/leaseDetails.css";
import { useState } from "react";
import {
  FiArrowLeft,
  FiMessageSquare,
  FiDownload,
  FiUpload,
  FiPlus,
  FiEdit,
  FiFileText,
} from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import AiLeaseAssistant from "../components/AiLeaseAssistant";
import LeaseMainContent from "../components/LeaseMainContent";


const LeaseDetails = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Info");
  const [showAiAssistant, setShowAiAssistant] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);


  return (
    
    <div className="lease-page">
      {/* ===== FIXED HEADER ===== */}
      <header className="lease-header">
        <div className="header-left">
          <FiArrowLeft className="header-back" onClick={() => navigate("/units")}/>
          <div className="header-text">
            <h1>Acme Corp - Lease Abstraction</h1>
            <p>Downtown Plaza · Suite 100</p>
          </div>
        </div>

        <div className="header-right">
          <button
  className="ai-btn"
  onClick={() => setShowAiAssistant(true)}
>
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

          <div
            className="upload-box"
            onClick={() => setShowUploadModal(true)}
          >
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

        <main className="lease-content">
          <LeaseMainContent
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          <AiLeaseAssistant
            open={showAiAssistant}
            onClose={() => setShowAiAssistant(false)}
          />
        </main>
      
      </div>
    </div>
  );
};

export default LeaseDetails;

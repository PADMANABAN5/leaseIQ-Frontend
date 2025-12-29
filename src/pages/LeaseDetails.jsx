import { useState, useEffect } from "react";
import api from "../service/api.js";
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
import { useNavigate, useParams } from "react-router-dom";
import AiLeaseAssistant from "../components/AiLeaseAssistant";
import LeaseMainContent from "../components/LeaseMainContent";
import "../styles/leaseDetails.css";
import FloatingSignOut from "../components/FloatingSingout";  
import { showSuccess, showError } from "../service/toast";
const BASE_URL = import.meta.env.VITE_API_BASE_URL
const LeaseDetails = () => {
  const navigate = useNavigate();
  const { leaseId } = useParams();
  const token = sessionStorage.getItem("token");
  const [activeTab, setActiveTab] = useState("Info");
  const [showAiAssistant, setShowAiAssistant] = useState(false);
 
const [lease, setLease] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchLease = async () => {
    try {
      const res = await api.get(
        `${BASE_URL}/api/leases/${leaseId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLease(res.data.data);
    } finally {
      setLoading(false);
    }
  };
  fetchLease();
}, [leaseId, token]);

  const handleLeaseDetailsUpdate = async (updatedLeaseDetails) => {
    try {
      await api.patch(
        `${BASE_URL}/api/leases/${leaseId}/details`,
        {
          lease_details: updatedLeaseDetails,
        }
      );

      setLease((prev) =>
        prev
          ? {
              ...prev,
              lease_details: {
                ...(prev.lease_details || {}),
                details: updatedLeaseDetails,
              },
            }
          : prev
      );

      showSuccess("Lease details updated successfully");
    } catch (error) {
      console.error("Failed to update lease details", error);
      const message = error?.response?.data?.message ||
        "Failed to update lease details";
      showError(message);
    }
  };

  if (loading) {
    return (
      <div className="lease-page">
        <header className="lease-header">
          <div className="header-left">
            <FiArrowLeft
              className="header-back"
              onClick={() =>
                navigate(`/tenant/${lease?.tenant?._id}`, {
                  state: { tenantName: lease?.tenant?.tenant_name },
                })
              }
            />
            <div className="header-text">
              <h1>Loading lease...</h1>
            </div>
          </div>
        </header>
      </div>
    );
  }

  return (
    
    <div className="lease-page">
      <FloatingSignOut />
      <header className="lease-header">
        <div className="header-left">
          <FiArrowLeft
            className="header-back"
            onClick={() =>
              navigate(`/tenant/${lease?.tenant?._id}`, {
                state: { tenantName: lease?.tenant?.tenant_name },
              })
            }
          />
          <div className="header-text">
            <h1>{lease?.tenant?.tenant_name} - Lease Abstraction</h1>
            <p>{lease?.property?.property_name} 
              
              · {lease?.unit?.unit_number}
            </p>
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
          <h4>{lease?.tenant?.tenant_name}</h4>
          <span className="muted">Document Library</span>

          <div
            className="upload-box"
           // onClick={() => setShowUploadModal(true)}
          >
            <FiUpload />
            <p>Drop PDF here or click to upload</p>
          </div>

          <div className="doc-list">
            {lease?.documents?.map((doc) => (
              <div key={doc._id} className="doc-item">
                <div className="doc-name">{doc.document_name}</div>
                <span>
                  {doc.document_type} · {new Date(doc.created_at).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </aside>     

        <main className="lease-content">
          <LeaseMainContent
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            leaseMeta={lease}
            leaseDetails={lease?.lease_details?.details}
            onUpdateLeaseDetails={handleLeaseDetailsUpdate}
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

import "../styles/analysisSuccess.css";
import { useNavigate } from "react-router-dom";

import {
  FiCheckCircle,
  FiCalendar,
  FiDollarSign,
  FiFileText,
  FiHome,
} from "react-icons/fi";

const AnalysisSuccess = () => {

  const navigate = useNavigate();


  return (
    <div className="success-page">
      <div className="success-card">
        {/* Success Icon */}
        <div className="success-icon">
          <FiCheckCircle size={28} />
        </div>

        <h2>Lease Analyzed Successfully!</h2>
        <p className="success-subtitle">rer - ewr</p>

        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-box blue">
            <FiCalendar className="stat-icon" />
            <h3>26</h3>
            <p>key dates found</p>
          </div>

          <div className="stat-box purple">
            <FiDollarSign className="stat-icon" />
            <h3>8</h3>
            <p>rent payment schedules found</p>
          </div>

          <div className="stat-box pink">
            <FiFileText className="stat-icon" />
            <h3>12</h3>
            <p>important terms found</p>
          </div>

          <div className="stat-box indigo">
            <FiHome className="stat-icon" />
            <h3>4</h3>
            <p>CAM provisions found</p>
          </div>
        </div>

        {/* Actions */}
        <button className="btn-primary">Go to Dashboard →</button>

        <div className="secondary-actions">
          <button className="btn-secondary" onClick={() => navigate("/lease-details")}>View Lease Details</button>
          <button className="btn-secondary">Add Another Unit</button>
        </div>
      </div>
    </div>
  );
};

export default AnalysisSuccess;

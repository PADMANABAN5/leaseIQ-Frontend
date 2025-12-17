import "../styles/unit.css";
import { FiPlus, FiCalendar } from "react-icons/fi";

const Unit = () => {
  return (
    <div className="unit-page">
      {/* Header */}
      <div className="unit-header">
        <span className="back-text">← Back to Dashboard</span>

        <div className="unit-title">
          <div className="unit-icon">🏢</div>
          <div>
            <h2>Downtown Cafe</h2>
            <p>Tenant Dashboard</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="unit-stats">
        <div className="stat-card">
          <p>Total Units</p>
          <h2>3</h2>
          <span>Occupied units</span>
        </div>

        <div className="stat-card">
          <p>Total Sq Ft</p>
          <h2>15,000</h2>
          <span>Square footage</span>
        </div>

        <div className="stat-card">
          <p>Monthly Rent</p>
          <h2>$45,000</h2>
          <span>Total monthly</span>
        </div>

        <div className="stat-card">
          <p>Avg Rent/Sq Ft</p>
          <h2>$3.00</h2>
          <span>Per square foot</span>
        </div>
      </div>

      {/* Units Header */}
      <div className="units-header">
        <h3>Units</h3>
        <button className="add-unit-btn">
          <FiPlus /> Add Unit
        </button>
      </div>

      {/* Unit Card 1 */}
      <div className="unit-card">
        <div className="unit-top">
          <div>
            <strong>Unit 101</strong>
            <span className="badge active">Active</span>
            <p>Downtown Plaza</p>
            <small>123 Main St, Suite 101, New York, NY 10001</small>
          </div>

          <div className="rent">
            <strong>$15,000</strong>
            <small>5,000 sq ft</small>
          </div>
        </div>

        <div className="unit-dates">
          <FiCalendar />
          <span>Start: 2023-01-01 • End: 2025-12-31</span>
        </div>
      </div>

      {/* Unit Card 2 */}
      <div className="unit-card">
        <div className="unit-top">
          <div>
            <strong>Unit 205</strong>
            <span className="badge warning">Expiring Soon</span>
            <p>Westside Tower</p>
            <small>456 Oak Ave, Suite 205, New York, NY 10002</small>
          </div>

          <div className="rent">
            <strong>$22,500</strong>
            <small>7,500 sq ft</small>
          </div>
        </div>

        <div className="unit-dates">
          <FiCalendar />
          <span>Start: 2022-06-01 • End: 2025-05-31</span>
        </div>
      </div>

      {/* Unit Card 3 */}
      <div className="unit-card">
        <div className="unit-top">
          <div>
            <strong>Unit 310</strong>
            <span className="badge active">Active</span>
            <p>Metro Center</p>
            <small>789 Park Blvd, Suite 310, New York, NY 10003</small>
          </div>

          <div className="rent">
            <strong>$7,500</strong>
            <small>2,500 sq ft</small>
          </div>
        </div>

        <div className="unit-dates">
          <FiCalendar />
          <span>Start: 2024-01-01 • End: 2027-12-31</span>
        </div>
      </div>
    </div>
  );
};

export default Unit;

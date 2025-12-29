import { FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";

const InfoTab = ({
  leaseInfo,
  leaseMeta,
  chargeSchedules,
  miscProvisions,
  premisesAndTerm,
  derivedSecurityDeposit,
  getFieldValue,
  formatDisplayValue,
}) => {
  return (
    <>
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
            <p>{getFieldValue(leaseInfo?.lease) || "N/A"}</p>
          </div>
          <div>
            <label>Property</label>
            <p>{leaseMeta?.property?.property_name || "N/A"}</p>
          </div>
          <div>
            <label>Property Address</label>
            <p>{getFieldValue(leaseInfo?.property) || "N/A"}</p>
          </div>
          <div>
            <label>Lease From</label>
            <p>{getFieldValue(leaseInfo?.leaseFrom) || "N/A"}</p>
          </div>
          <div>
            <label>Lease To</label>
            <p>{getFieldValue(leaseInfo?.leaseTo) || "N/A"}</p>
          </div>
          <div>
            <label>Square Feet</label>
            <p>
              {leaseMeta?.unit?.square_ft
                ? `${leaseMeta.unit.square_ft} sqft`
                : "N/A"}
            </p>
          </div>
          <div>
            <label>Base Rent</label>
            <p>
              {chargeSchedules?.baseRent?.[0]?.monthlyAmount?.value
                ? `${
                    chargeSchedules.baseRent[0].monthlyAmount.value
                  } / month`
                : leaseMeta?.unit?.monthly_rent
                ? `${leaseMeta.unit.monthly_rent} / month`
                : "N/A"}
            </p>
          </div>
          <div>
            <label>Security Deposit</label>
            <p>{derivedSecurityDeposit || "N/A"}</p>
          </div>
          <div>
            <label>Renewal Options</label>
            <p>{getFieldValue(premisesAndTerm?.synopsis) || "N/A"}</p>
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
            premisesAndTerm?.synopsis?.value,
            premisesAndTerm?.keyParameters?.value,
            premisesAndTerm?.narrative?.value,
            miscProvisions?.operatingExpenses?.synopsis?.value,
            miscProvisions?.taxes?.synopsis?.value,
            miscProvisions?.repairsAndMaintenance?.synopsis?.value,
          ]
            .map((raw) => formatDisplayValue(raw))
            .filter((text) => text)
            .map((item, i) => (
              <li key={i} className="summary-item">
                <span className="summary-text">{item}</span>
                <span className="summary-actions">
                  <FiEdit />
                  <FiTrash2 />
                </span>
              </li>
            ))}
        </ul>
      </section>
    </>
  );
};

export default InfoTab;

import { useState } from "react";
import { FiUpload, FiFileText } from "react-icons/fi";
import InfoTab from "./InfoTab";
import SpaceTab from "./SpaceTab";
import RentSchedulesTab from "./RentSchedulesTab";
import ProvisionsTab from "./ProvisionsTab";
import AuditTab from "./AuditTab";
import CamTab from "./CamTab";

const TABS = ["Info", "Space", "Rent Schedules", "Provisions", "Audit", "CAM"];

const CAM_RULES = [
  {
    key: "recon",
    title: "Reconciliations & Adjustments",
    statusClass: "purple",
    status: "Active",
    count: "1 rules",
    content: `Tenant is responsible for a FOUR (4)% share as a tenant of the
Premises, subject to adjustment as a result of (1) Occupancy/load factor
changes, (2) Change in the size of the Premises, or (3) Expansion in the
gross leasable square feet of the Building. Operating Expenses shall be
calculated annually and shall reconcile for payment by the same method as
calculating the tenant's rent, with payment allowed in the next successive
billing period.`,
    citations: ["Section 4.2", "Page 8"],
  },
  {
    key: "lease",
    title: "LEASE TAKINGS",
    statusClass: "blue",
    status: "Active",
    count: "1 rules",
    content: `After intent described taxes are allocated (such as ad-valorem charges or public assessments) depending on size and actual use.`,
    citations: ["Section 7.4"],
  },
  {
    key: "exclusions",
    title: "Exclusions",
    statusClass: "green",
    status: "Active",
    count: "1 rules",
    content: "All Expense not stated here are excluded from CAM recoveries. Items specifically excluded from CAM include, but are not limited to: (a) rent payable under any equipment leases, (b) principal and interest of any financing undertaken for the landlord, (c) Costs incurred in operating/equipping the rental office, or in advertising and promotion of the Building, (d) Legal and judgment/settlement of any landlord obligations, (e) Landlord's income tax or franchise tax, (f) Expenses specifically billed to other tenants but not to tenant's proportionate share due to non-use or custom-built facilities, (g) Tenant improvement costs or capital improvements unless pre-approved/amortized (see Capital Expenditure clause below), (h) Expenses directly attributable to another leasable space.",
    citations: ["Section 4.3", "Page 10"],
  },
  {
    key: "payment",
    title: "Payment Schedule",
    statusClass: "orange",
    status: "Active",
    count: "1 rules",
    content: "Tenant's proportionate share of operating expenses estimated at $8.50/sqft annually, payable monthly. Monthly payments based on landlord's estimate, subject to annual reconciliation.",
    citations: ["Section 4.1"],
  },
  {
    key: "audit",
    title: "Audit Rights",
    statusClass: "orange",
    status: "Active",
    count: "1 rules",
    content: "Tenant has right to audit landlord's books and records related to operating expenses upon 30 days written notice. Audit must be conducted within 180 days of receiving annual reconciliation statement. If audit reveals overcharge greater than 5%, landlord pays audit costs.",
    citations: ["Section 4.4", "Page 11"],
  },
];

const LeaseMainContent = ({
  activeTab,
  setActiveTab,
  leaseMeta,
  leaseDetails,
  onUpdateLeaseDetails,
}) => {
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddItem, setShowAddItem] = useState(false);
  const [showEditCategory, setShowEditCategory] = useState(false);
  const [editCategoryName, setEditCategoryName] = useState("");
  const [openCam, setOpenCam] = useState(null);
  const [showEditCam, setShowEditCam] = useState(false);
  const [editCamRule, setEditCamRule] = useState(null);
  const [showAddCam, setShowAddCam] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [docType, setDocType] = useState("main");

  const [newCamRule, setNewCamRule] = useState({
    title: "",
    content: "",
    citations: "",
  });

  const leaseInfo = leaseDetails?.info?.leaseInformation;
  const spaceInfo = leaseDetails?.space?.space;
  const chargeSchedules = leaseDetails?.["charge-schedules"]?.chargeSchedules;
  const miscProvisions = leaseDetails?.misc?.otherLeaseProvisions;
  const camSingle = leaseDetails?.["cam-single"]?.data;

  const rawAudit = leaseDetails?.audit;
  const auditSource =
    rawAudit?.identified_risks || rawAudit?.audit_checklist || [];

  const auditRisks = Array.isArray(auditSource)
    ? auditSource.map((item) => {
        if (item.page_number == null) {
          const refs = Array.isArray(item.page_reference)
            ? item.page_reference
            : Array.isArray(item.page_references)
            ? item.page_references
            : null;

          if (refs && refs.length > 0) {
            return { ...item, page_number: refs[0] };
          }
        }

        return item;
      })
    : [];

  const resolvedCamRules = camSingle
    ? [
        {
          key: "cam-single",
          title: camSingle.sectionTitle || "CAM Clause",
          statusClass: "orange",
          status: "Active",
          count: "1 rule",
          content:
            camSingle.textContent ||
            camSingle.executionClause ||
            "CAM clause details extracted from the lease.",
          citations: camSingle.pageNumber
            ? [`Page ${camSingle.pageNumber}`]
            : [],
          tables: camSingle.tables || [],
        },
      ]
    : CAM_RULES;

  const getFieldValue = (field) => (field?.value ? String(field.value) : "");

  const formatDisplayValue = (value) => {
    if (value == null) return "";
    const valueType = typeof value;

    if (valueType === "string" || valueType === "number" || valueType === "boolean") {
      return String(value);
    }

    if (valueType === "object") {
      const parts = Object.values(value).filter((v) => v != null && v !== "");
      return parts.length ? parts.join(" • ") : "";
    }

    return "";
  };

  const premisesAndTerm = miscProvisions?.premisesAndTerm;

  const derivedSecurityDeposit = (() => {
    const raw = premisesAndTerm?.keyParameters?.value;
    const text = typeof raw === "string" ? raw : "";
    const match = text.match(/Advance Deposit:\s*([^;]+)/i);
    return match ? match[1].trim() : "";
  })();

  const formatProvisionTitle = (rawKey) => {
    if (!rawKey) return "";
    const custom = {
      premisesAndTerm: "Premises and Term",
      operatingExpenses: "Operating Expenses",
      repairsAndMaintenance: "Repairs and Maintenance",
      liabilityAndIndemnification: "Liability and Indemnification",
      landlordsRightOfEntry: "Landlord's Right of Entry",
      rightOfFirstRefusalOffer: "Right of First Refusal / Offer",
      expansionAndRelocation: "Expansion and Relocation",
    };

    if (custom[rawKey]) return custom[rawKey];

    return rawKey
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (c) => c.toUpperCase());
  };

  const toggleCam = (key) => {
    setOpenCam((current) => (current === key ? null : key));
  };

  const handleEditCategory = (categoryName) => {
    setEditCategoryName(categoryName);
    setShowEditCategory(true);
  };

  return (
     <>

      {/* Tabs */}
      <div className="tabs">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

                {/* ===== SCROLLABLE SECTION ===== */}
                <div className="scroll-section">
        {activeTab === "Info" && (
          <InfoTab
            leaseDetails={leaseDetails}
            leaseInfo={leaseInfo}
            leaseMeta={leaseMeta}
            chargeSchedules={chargeSchedules}
            miscProvisions={miscProvisions}
            premisesAndTerm={premisesAndTerm}
            derivedSecurityDeposit={derivedSecurityDeposit}
            getFieldValue={getFieldValue}
            formatDisplayValue={formatDisplayValue}
            onUpdateLeaseDetails={onUpdateLeaseDetails}
          />
        )}

        {activeTab === "Space" && (
          <SpaceTab
            leaseMeta={leaseMeta}
            spaceInfo={spaceInfo}
            getFieldValue={getFieldValue}
          />
        )}

        {activeTab === "Rent Schedules" && (
          <RentSchedulesTab
            chargeSchedules={chargeSchedules}
            getFieldValue={getFieldValue}
          />
        )}

        {activeTab === "Provisions" && (
          <ProvisionsTab
            miscProvisions={miscProvisions}
            formatProvisionTitle={formatProvisionTitle}
            onAddCategory={() => setShowAddCategory(true)}
            onAddItem={() => setShowAddItem(true)}
            onEditCategory={handleEditCategory}
          />
        )}

        {activeTab === "Audit" && <AuditTab risks={auditRisks} />}

        {activeTab === "CAM" && (
          <CamTab
            resolvedCamRules={resolvedCamRules}
            openCam={openCam}
            onToggleCam={toggleCam}
            onAddRule={() => setShowAddCam(true)}
            onEditRule={(rule) => {
              setEditCamRule(rule);
              setShowEditCam(true);
            }}
          />
        )}

      </div>
      {showAddCategory && (
  <div
    className="modal fade show"
    style={{ display: "block", backgroundColor: "rgba(0,0,0,.4)" }}
  >
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">

        {/* Header */}
        <div className="modal-header">
          <h5 className="modal-title">Add New Category</h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setShowAddCategory(false)}
          />
        </div>

        {/* Body */}
        <div className="modal-body">
          <div className="mb-3">
            <label className="form-label">Category Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Parking and Access"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setShowAddCategory(false)}
          >
            Cancel
          </button>
          <button className="btn btn-primary btn-sm">
            Add Category
          </button>
        </div>

      </div>
    </div>
  </div>
)}

{showAddItem && (
  <div
    className="modal fade show"
    style={{ display: "block", backgroundColor: "rgba(0,0,0,.4)" }}
  >
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">

        {/* Header */}
        <div className="modal-header">
          <h5 className="modal-title">Add Provision Item</h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setShowAddItem(false)}
          />
        </div>

        {/* Body */}
        <div className="modal-body">
          <div className="mb-3">
            <label className="form-label">Item Text</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter provision item..."
            />
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setShowAddItem(false)}
          >
            Cancel
          </button>
          <button className="btn btn-primary btn-sm">
            Add
          </button>
        </div>

      </div>
    </div>
  </div>
)}

{showEditCategory && (
  <div
    className="modal fade show"
    style={{ display: "block", backgroundColor: "rgba(0,0,0,.4)" }}
  >
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">

        {/* Header */}
        <div className="modal-header">
          <h5 className="modal-title">Edit Category</h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setShowEditCategory(false)}
          />
        </div>

        {/* Body */}
        <div className="modal-body">
          <div className="mb-3">
            <label className="form-label">Category Name</label>
            <input
              type="text"
              className="form-control"
              value={editCategoryName}
              onChange={(e) => setEditCategoryName(e.target.value)}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setShowEditCategory(false)}
          >
            Cancel
          </button>
          <button className="btn btn-primary btn-sm">
            Update
          </button>
        </div>

      </div>
    </div>
  </div>
)}

{showEditCam && editCamRule && (
  <div
    className="modal fade show"
    style={{ display: "block", backgroundColor: "rgba(0,0,0,.4)" }}
  >
    <div className="modal-dialog modal-dialog-centered modal-lg cam-edit-modal">
      <div className="modal-content">

        {/* Header */}
        <div className="modal-header">
          <h5 className="modal-title">Edit CAM Rule</h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setShowEditCam(false)}
          />
        </div>

        {/* Body */}
        <div className="modal-body">
          <div className="mb-3">
            <label className="form-label">Rule Title</label>
            <input
              type="text"
              className="form-control"
              value={editCamRule.title}
              readOnly
            />
          </div>

          <div className="mb-3">
  <label className="form-label">Rule Content</label>
  <textarea
    className="form-control"
    defaultValue={editCamRule.content}
    style={{
      resize: "none",
      overflow: "hidden",
    }}
    onInput={(e) => {
      e.target.style.height = "auto";
      e.target.style.height = e.target.scrollHeight + "px";
    }}
    ref={(el) => {
      if (el) {
        el.style.height = "auto";
        el.style.height = el.scrollHeight + "px";
      }
    }}
  />
</div>


          <div className="mb-3">
            <label className="form-label">
              Citations (comma-separated)
            </label>
            <input
              type="text"
              className="form-control"
              defaultValue={editCamRule.citations}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setShowEditCam(false)}
          >
            Cancel
          </button>
          <button className="btn btn-primary btn-sm">
            Update Rule
          </button>
        </div>

      </div>
    </div>
  </div>
)}


{showAddCam && (
  <div
    className="modal fade show"
    style={{ display: "block", backgroundColor: "rgba(0,0,0,.4)" }}
  >
    <div className="modal-dialog modal-dialog-centered cam-add-modal">
      <div className="modal-content">

        {/* Header */}
        <div className="modal-header">
          <div>
            <h5 className="modal-title">Add New CAM Rule</h5>
            <p className="modal-subtitle">
              Add a new rule to the CAM tab.
            </p>
          </div>
          <button
            type="button"
            className="btn-close"
            onClick={() => setShowAddCam(false)}
          />
        </div>

        {/* Body */}
        <div className="modal-body cam-modal-body">

          <div className="mb-3">
            <label className="form-label">Rule Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g., Capital Improvements"
              value={newCamRule.title}
              onChange={(e) =>
                setNewCamRule({ ...newCamRule, title: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Rule Content</label>
            <textarea
              className="form-control"
              placeholder="Enter the detailed rule content..."
              value={newCamRule.content}
              style={{
                resize: "none",
                overflow: "hidden",
              }}
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = e.target.scrollHeight + "px";
              }}
              onChange={(e) =>
                setNewCamRule({ ...newCamRule, content: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Citations (comma-separated)
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g., Section 4.5, Page 12"
              value={newCamRule.citations}
              onChange={(e) =>
                setNewCamRule({ ...newCamRule, citations: e.target.value })
              }
            />
          </div>

        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setShowAddCam(false)}
          >
            Cancel
          </button>
          <button className="btn btn-primary btn-sm">
            Add Rule
          </button>
        </div>

      </div>
    </div>
  </div>
)}


{showUploadModal && (
  <div
    className="modal fade show"
    style={{ display: "block", backgroundColor: "rgba(0,0,0,.4)" }}
  >
    <div className="modal-dialog modal-dialog-centered upload-modal">
      <div className="modal-content">

        {/* Header */}
        <div className="modal-header">
          <div>
            <h5 className="modal-title">Upload Document</h5>
            <p className="modal-subtitle">
              Select the type of document you want to upload.
            </p>
          </div>
          <button
            type="button"
            className="btn-close"
            onClick={() => setShowUploadModal(false)}
          />
        </div>

        {/* Body */}
        <div className="modal-body">

          {/* Document Type */}
          <label className="form-label">Document Type</label>

          <div className="doc-type-grid">
            <div
              className={`doc-type-card ${
                docType === "main" ? "active" : ""
              }`}
              onClick={() => setDocType("main")}
            >
              <FiFileText size={20} />
              <span>Main Lease</span>
            </div>

            <div
              className={`doc-type-card ${
                docType === "amendment" ? "active" : ""
              }`}
              onClick={() => setDocType("amendment")}
            >
              <FiFileText size={20} />
              <span>Amendment</span>
            </div>
          </div>

          {/* Upload Area */}
          <div className="upload-dropzone">
            <FiUpload size={22} />
            <p>Drag and drop your PDF here</p>

            <button className="btn btn-primary btn-sm">
              Browse Files
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>
)}

    </>

  );
};

export default LeaseMainContent;

import "../styles/leaseDetails.css";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { FiChevronRight } from "react-icons/fi";



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

const LeaseDetails = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Info");
  const [lateFeeOpen, setLateFeeOpen] = useState(true);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddItem, setShowAddItem] = useState(false);
  const [showEditCategory, setShowEditCategory] = useState(false);
const [editCategoryName, setEditCategoryName] = useState("");
const [openCam, setOpenCam] = useState(null);
const [showEditCam, setShowEditCam] = useState(false);
const [editCamRule, setEditCamRule] = useState(null);
const [showAddCam, setShowAddCam] = useState(false);
const [showUploadModal, setShowUploadModal] = useState(false);
const [docType, setDocType] = useState("main"); // main | amendment


const [newCamRule, setNewCamRule] = useState({
  title: "",
  content: "",
  citations: "",
});

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


const toggleCam = (key) => {
  setOpenCam(openCam === key ? null : key);
};


const handleEditCategory = (categoryName) => {
  setEditCategoryName(categoryName);
  setShowEditCategory(true);
};



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
  ].map((tab) => (
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
          <div><label>Lease</label><p>Commercial Lease Agreement</p></div>
          <div><label>Property</label><p>Downtown Plaza - Suite 100</p></div>
          <div><label>Property Address</label><p>123 Main Street, Downtown</p></div>
          <div><label>Lease From</label><p>2022-01-01</p></div>
          <div><label>Lease To</label><p>2025-12-31</p></div>
          <div><label>Square Feet</label><p>5,000 sqft</p></div>
          <div><label>Base Rent</label><p>$18,750 / month</p></div>
          <div><label>Security Deposit</label><p>$37,500</p></div>
          <div><label>Renewal Options</label><p>2 × 5-year options</p></div>
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
            "Base rent: $45 per square foot annually, payable monthly at $18,750",
            "Annual rent escalation: 3%",
            "Security deposit of $37,500",
            "Tenant responsible for CAM expenses",
            "Two renewal options of 5 years",
          ].map((item, i) => (
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
  )}

  {activeTab === "Space" && (
    <section className="card">
      <div className="card-header">
        <h3>Space Details</h3>
      </div>

      <div className="info-grid">
        <div><label>Premises</label><p>Suite 200, Second Floor</p></div>
        <div><label>Address</label><p>123 Main Street, Downtown Plaza</p></div>
        <div><label>City</label><p>San Francisco</p></div>
        <div><label>State</label><p>CA</p></div>
        <div><label>ZIP Code</label><p>94102</p></div>
        <div><label>Total Area</label><p>5,000 sqft</p></div>
        <div><label>Usable Area</label><p>4,750 sqft</p></div>
        <div><label>Common Area</label><p>250 sqft</p></div>
        <div><label>Parking Spaces</label><p>10 spaces</p></div>
        <div><label>Parking Type</label><p>Reserved</p></div>
        <div><label>Storage Area</label><p>200 sqft</p></div>
      </div>
    </section>
  )}

  {activeTab === "Rent Schedules" && (
  <div className="rent-schedules">

    <h3 className="section-title">Charge Schedules</h3>

    {/* REAL ACCORDION */}
    <details className="accordion-card" open>
      <summary className="accordion-summary">
  <span className="accordion-left">
    <FiChevronDown className="accordion-icon" />
    Late Fee Information
  </span>
</summary>


      <div className="accordion-body">
        <div className="latefee-grid">

          <div className="latefee-card">
            <label>Calculation Type</label>
            <p>Percentage of Overdue Amount</p>
            <span className="citation">Citation: Page 12</span>
          </div>

          <div className="latefee-card">
            <label>Grace Days</label>
            <p>N/A</p>
          </div>

          <div className="latefee-card">
            <label>Percent</label>
            <p>5%</p>
            <span className="citation">Citation: Page 12</span>
          </div>

          <div className="latefee-card">
            <label>Second Fee Calculation Type</label>
            <p>N/A</p>
          </div>

          <div className="latefee-card">
            <label>Second Fee Grace</label>
            <p>N/A</p>
          </div>

          <div className="latefee-card">
            <label>Second Fee Percent</label>
            <p>N/A</p>
          </div>

          <div className="latefee-card">
            <label>Per Day Fee</label>
            <p>N/A</p>
          </div>

        </div>
      </div>
    </details>

    {/* BASE RENT TABLE — NOT IN ACCORDION */}
    <section className="card base-rent-card">
      <h3 className="card-title">Base Rent Schedule</h3>

      <table className="rent-table">
        <thead>
          <tr>
            <th>Period</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Monthly Rent</th>
            <th>Annual Rent</th>
            <th>$/Sqft</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Year 1</td>
            <td>2022-01-01</td>
            <td>2022-12-31</td>
            <td>$18,750</td>
            <td>$225,000</td>
            <td>$45.00</td>
          </tr>
          <tr>
            <td>Year 2</td>
            <td>2023-01-01</td>
            <td>2023-12-31</td>
            <td>$19,313</td>
            <td>$231,750</td>
            <td>$46.35</td>
          </tr>
          <tr>
            <td>Year 3</td>
            <td>2024-01-01</td>
            <td>2024-12-31</td>
            <td>$19,892</td>
            <td>$238,703</td>
            <td>$47.74</td>
          </tr>
          <tr>
            <td>Year 4</td>
            <td>2025-01-01</td>
            <td>2025-12-31</td>
            <td>$20,489</td>
            <td>$245,864</td>
            <td>$49.17</td>
          </tr>
        </tbody>
      </table>
    </section>

  </div>
)}

{activeTab === "Provisions" && (
  <div className="provisions">

    {/* Header */}
    <div className="provisions-header">
      <h3>Key Lease Provisions</h3>
      <button
  className="btn btn-outline-primary btn-sm"
  onClick={() => setShowAddCategory(true)}
>
  + Add Category
</button>

    </div>

    {/* ===== CATEGORY 1 ===== */}
    <section className="card provision-card">
      <div className="provision-header">
        <h4>Use and Occupancy</h4>

        <div className="provision-actions">
          <button
  className="text-btn"
  onClick={() => setShowAddItem(true)}
>
  + Add Item
</button>

          <FiEdit
  className="icon edit"
  onClick={() => handleEditCategory("Use and Occupancy")}
/>


          <FiTrash2 className="icon delete" />
        </div>
      </div>

      <ul className="provision-list">
        <li className="provision-item">
          Permitted use: General office purposes only
          <span className="item-actions">
            <FiEdit />
            <FiTrash2 />
          </span>
        </li>

        <li className="provision-item">
          No retail or industrial activities permitted without landlord consent
          <span className="item-actions">
            <FiEdit />
            <FiTrash2 />
          </span>
        </li>

        <li className="provision-item">
          Tenant must comply with all zoning regulations
          <span className="item-actions">
            <FiEdit />
            <FiTrash2 />
          </span>
        </li>
      </ul>
    </section>

    {/* ===== CATEGORY 2 ===== */}
    <section className="card provision-card">
      <div className="provision-header">
        <h4>Maintenance and Repairs</h4>

        <div className="provision-actions">
          <button
  className="text-btn"
  onClick={() => setShowAddItem(true)}
>
  + Add Item
</button>

          <FiEdit
  className="icon edit"
  onClick={() => handleEditCategory("Maintenance and Repairs")}
/>

          <FiTrash2 className="icon delete" />
        </div>
      </div>

      <ul className="provision-list">
        <li className="provision-item">
          Landlord maintains structural elements, roof, and exterior walls
          <span className="item-actions">
            <FiEdit />
            <FiTrash2 />
          </span>
        </li>

        <li className="provision-item">
          Tenant responsible for interior maintenance and janitorial services
          <span className="item-actions">
            <FiEdit />
            <FiTrash2 />
          </span>
        </li>

        <li className="provision-item">
          HVAC maintenance shared – landlord maintains equipment, tenant pays for service
          <span className="item-actions">
            <FiEdit />
            <FiTrash2 />
          </span>
        </li>
      </ul>
    </section>

    {/* ===== CATEGORY 3 ===== */}
    <section className="card provision-card">
      <div className="provision-header">
        <h4>Insurance</h4>

        <div className="provision-actions">
          <button
  className="text-btn"
  onClick={() => setShowAddItem(true)}
>
  + Add Item
</button>

          <FiEdit
  className="icon edit"
  onClick={() => handleEditCategory("Insurance")}
/>

          <FiTrash2 className="icon delete" />
        </div>
      </div>

      <ul className="provision-list">
        <li className="provision-item">
          Tenant must maintain $2,000,000 general liability insurance
          <span className="item-actions">
            <FiEdit />
            <FiTrash2 />
          </span>
        </li>

        <li className="provision-item">
          Property insurance required for tenant improvements and personal property
          <span className="item-actions">
            <FiEdit />
            <FiTrash2 />
          </span>
        </li>

        <li className="provision-item">
          Landlord to be named as additional insured on all policies
          <span className="item-actions">
            <FiEdit />
            <FiTrash2 />
          </span>
        </li>
      </ul>
    </section>

    {/* ===== CATEGORY 4 ===== */}
    <section className="card provision-card">
      <div className="provision-header">
        <h4>Assignment and Subletting</h4>

        <div className="provision-actions">
          <button
  className="text-btn"
  onClick={() => setShowAddItem(true)}
>
  + Add Item
</button>

          <FiEdit
  className="icon edit"
  onClick={() => handleEditCategory("Assignment and Subletting")}
/>

          <FiTrash2 className="icon delete" />
        </div>
      </div>

      <ul className="provision-list">
        <li className="provision-item">
          Tenant may not assign or sublet without landlord written consent
          <span className="item-actions">
            <FiEdit />
            <FiTrash2 />
          </span>
        </li>

        <li className="provision-item">
          Landlord consent not to be unreasonably withheld
          <span className="item-actions">
            <FiEdit />
            <FiTrash2 />
          </span>
        </li>

        <li className="provision-item">
          Assignment fee of $2,500 due upon landlord approval
          <span className="item-actions">
            <FiEdit />
            <FiTrash2 />
          </span>
        </li>
      </ul>
    </section>

    {/* ===== CATEGORY 5 ===== */}
    <section className="card provision-card">
      <div className="provision-header">
        <h4>Default and Remedies</h4>

        <div className="provision-actions">
          <button
  className="text-btn"
  onClick={() => setShowAddItem(true)}
>
  + Add Item
</button>

          <FiEdit
  className="icon edit"
  onClick={() => handleEditCategory("Default and Remedies")}
/>

          <FiTrash2 className="icon delete" />
        </div>
      </div>

      <ul className="provision-list">
        <li className="provision-item">
          Default if rent unpaid for 10 days after due date
          <span className="item-actions">
            <FiEdit />
            <FiTrash2 />
          </span>
        </li>

        <li className="provision-item">
          Default if tenant breaches any covenant and fails to cure within 30 days
          <span className="item-actions">
            <FiEdit />
            <FiTrash2 />
          </span>
        </li>

        <li className="provision-item">
          Landlord may terminate lease and pursue all available remedies
          <span className="item-actions">
            <FiEdit />
            <FiTrash2 />
          </span>
        </li>
      </ul>
    </section>

  </div>
)}

{activeTab === "Audit" && (
  <div className="audit">

    <div className="audit-card">
      <h3 className="audit-title">
        Found 27 potential issues requiring attention
      </h3>

      <ul className="audit-list">

        {/* Item 1 */}
        <li className="audit-item">
          <div className="audit-left">
            <FiChevronRight className="audit-chevron" />
            <span>Ambiguous Cost Allocation</span>
          </div>

          <div className="audit-right">
            <span className="priority high">High Priority</span>
            <span className="count">3 items</span>
          </div>
        </li>

        {/* Item 2 */}
        <li className="audit-item">
          <div className="audit-left">
            <FiChevronRight className="audit-chevron" />
            <span>Inadequate Standard - Measurable Effort</span>
          </div>

          <div className="audit-right">
            <span className="priority medium">Medium</span>
            <span className="count">2 items</span>
          </div>
        </li>

        {/* Item 3 */}
        <li className="audit-item">
          <div className="audit-left">
            <FiChevronRight className="audit-chevron" />
            <span>Inadequate Standard - Reasonable Judgement</span>
          </div>

          <div className="audit-right">
            <span className="priority medium">Medium</span>
          </div>
        </li>

        {/* Item 4 */}
        <li className="audit-item">
          <div className="audit-left">
            <FiChevronRight className="audit-chevron" />
            <span>Unexplained Financial Risk - Audit Cost</span>
          </div>

          <div className="audit-right">
            <span className="priority medium">Medium</span>
          </div>
        </li>

        {/* Item 5 */}
        <li className="audit-item">
          <div className="audit-left">
            <FiChevronRight className="audit-chevron" />
            <span>Unexplained Financial Risk - Additional Services</span>
          </div>

          <div className="audit-right">
            <span className="priority medium">Medium</span>
          </div>
        </li>

        {/* Item 6 */}
        <li className="audit-item">
          <div className="audit-left">
            <FiChevronRight className="audit-chevron" />
            <span>Missing Core Field - Base Rent Amount</span>
          </div>

          <div className="audit-right">
            <span className="priority high">High Priority</span>
          </div>
        </li>

      </ul>
    </div>
  </div>
)}

{activeTab === "CAM" && (
  <div className="cam">

    {/* Overview */}
    <div className="cam-overview">
      <h3>Overview</h3>
      <p>Click on any category to view detailed lease language and analysis</p>
    </div>

    {/* Rules Card */}
    <div className="cam-card">
      <div className="cam-card-header">
        <h4>Rules</h4>
        <button
  className="btn btn-outline-primary btn-sm"
  onClick={() => setShowAddCam(true)}
>
  + Add Rule
</button>

      </div>

      <ul className="cam-list">
  {CAM_RULES.map((rule) => (
    <li className="cam-item" key={rule.key}>
      <div
        className="cam-row"
        onClick={() => toggleCam(rule.key)}
      >
        <div className="cam-left">
          {openCam === rule.key ? <FiChevronDown /> : <FiChevronRight />}
          <span>{rule.title}</span>
        </div>

        <div className="cam-right">
          <span className="count">{rule.count}</span>
          <span className={`status ${rule.statusClass}`}>
            {rule.status}
          </span>

          <FiEdit
            className="icon edit"
            onClick={(e) => {
              e.stopPropagation();
              setEditCamRule(rule);
              setShowEditCam(true);
            }}
          />
          <FiTrash2 className="icon delete" />
        </div>
      </div>

      {openCam === rule.key && rule.content && (
        <div className="cam-content">
          <p>{rule.content}</p>

          <div className="cam-tags">
            {rule.citations?.map((c, i) => (
              <span className="tag" key={i}>{c}</span>
            ))}
          </div>
        </div>
      )}
    </li>
  ))}
</ul>

    </div>

    {/* ===== CAM SUMMARY PANELS ===== */}
<div className="cam-summary">

  {/* LEFT PANEL */}
  <div className="cam-summary-card green">
    <h4>Key Tenant Protections</h4>
    <ul>
      <li>All deductible cap on building operating expenses, with such caps/ceilings applied annually</li>
      <li>Initial assessment covers only actual CAM incurred during initial occupancy</li>
      <li>Detailed exclusions list protecting tenant from capital expenditure pass-throughs</li>
      <li>Rent discount/late-or-no payroll service credit if late or omitted landlord service</li>
      <li>Landlord shall not increase the estimate of operating expenses more than once per year</li>
      <li>Payments deemed additional rent but subject to direct credit if tenant occupies entire building</li>
      <li>Landlord must warrant and confirm each operating expenses item with supporting documentation and no "bundled" costs</li>
    </ul>
  </div>

  {/* RIGHT PANEL */}
  <div className="cam-summary-card orange">
    <h4>Key Tenant Expenses</h4>
    <ul>
      <li>Tenant in BUID in accordance with applicable management contract for management and CAM costs</li>
      <li>Insurance CAM includes only premiums for policies (not insurance CAM in excess of actual)</li>
      <li>Repair/service that is more accommodative to/requires tenant's lease or use</li>
      <li>Tenant's charge for use of leasebase-linked or CAM-eligible services</li>
      <li>Any HVAC or post-hours air-conditioning invoiced outside regular lease service hours or outside standard CAM rights</li>
      <li>If landlord or tenant abates the premises or gives access in case of early event or repairs/building costs tied to either premature occupancy or an insurance event</li>
    </ul>
  </div>

</div>

  </div>
  
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


        </main>
      </div>
    </div>
  );
};

export default LeaseDetails;

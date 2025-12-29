import { FiChevronDown, FiChevronRight, FiEdit, FiTrash2 } from "react-icons/fi";

const CamTab = ({
  resolvedCamRules,
  openCam,
  onToggleCam,
  onAddRule,
  onEditRule,
}) => {
  return (
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
            onClick={onAddRule}
          >
            + Add Rule
          </button>
        </div>

        <ul className="cam-list">
          {resolvedCamRules.map((rule) => (
            <li className="cam-item" key={rule.key}>
              <div className="cam-row" onClick={() => onToggleCam(rule.key)}>
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
                      onEditRule(rule);
                    }}
                  />
                  <FiTrash2 className="icon delete" />
                </div>
              </div>

              {openCam === rule.key && (
                <div className="cam-content">
                  {rule.content && <p>{rule.content}</p>}

                  {rule.citations && rule.citations.length > 0 && (
                    <div className="cam-tags">
                      {rule.citations.map((c, i) => (
                        <span className="tag" key={i}>
                          {c}
                        </span>
                      ))}
                    </div>
                  )}

                  {rule.tables && rule.tables.length > 0 && (
                    <div className="cam-tables">
                      {rule.tables.map((table, idx) => (
                        <div
                          className="cam-table"
                          key={table.tableId ?? idx}
                        >
                          {table.header && (
                            <div className="cam-table-header">
                              {Object.entries(table.header).map(([k, v]) => (
                                <span key={k}>{v ?? k}</span>
                              ))}
                            </div>
                          )}
                          {table.rows && table.rows.length > 0 && (
                            <ul className="cam-table-rows">
                              {table.rows.map((row, rowIdx) => (
                                <li key={rowIdx}>
                                  {Object.values(row).join(" | ")}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
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
            <li>
              All deductible cap on building operating expenses, with such
              caps/ceilings applied annually
            </li>
            <li>
              Initial assessment covers only actual CAM incurred during initial
              occupancy
            </li>
            <li>
              Detailed exclusions list protecting tenant from capital
              expenditure pass-throughs
            </li>
            <li>
              Rent discount/late-or-no payroll service credit if late or
              omitted landlord service
            </li>
            <li>
              Landlord shall not increase the estimate of operating expenses
              more than once per year
            </li>
            <li>
              Payments deemed additional rent but subject to direct credit if
              tenant occupies entire building
            </li>
            <li>
              Landlord must warrant and confirm each operating expenses item
              with supporting documentation and no "bundled" costs
            </li>
          </ul>
        </div>

        {/* RIGHT PANEL */}
        <div className="cam-summary-card orange">
          <h4>Key Tenant Expenses</h4>
          <ul>
            <li>
              Tenant in BUID in accordance with applicable management contract
              for management and CAM costs
            </li>
            <li>
              Insurance CAM includes only premiums for policies (not insurance
              CAM in excess of actual)
            </li>
            <li>
              Repair/service that is more accommodative to/requires tenant's
              lease or use
            </li>
            <li>
              Tenant's charge for use of leasebase-linked or CAM-eligible
              services
            </li>
            <li>
              Any HVAC or post-hours air-conditioning invoiced outside regular
              lease service hours or outside standard CAM rights
            </li>
            <li>
              If landlord or tenant abates the premises or gives access in case
              of early event or repairs/building costs tied to either premature
              occupancy or an insurance event
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CamTab;

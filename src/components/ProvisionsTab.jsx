import { FiEdit, FiTrash2 } from "react-icons/fi";

const ProvisionsTab = ({
  miscProvisions,
  formatProvisionTitle,
  onAddCategory,
  onAddItem,
  onEditCategory,
}) => {
  const normalizeValue = (val) => {
    if (typeof val === "string") return val;

    if (typeof val === "object" && val !== null) {
      return (
        <ul className="nested-provision">
          {Object.entries(val).map(([k, v]) => (
            <li key={k}>
              <strong>{formatProvisionTitle(k)}:</strong>{" "}
              {String(v)}
            </li>
          ))}
        </ul>
      );
    }

    return String(val);
  };
  return (
    <div className="provisions">
      {/* Header */}
       <div className="provisions-header">
        <h3>Key Lease Provisions</h3>
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={onAddCategory}
        >
          + Add Category
        </button>
      </div>

      {miscProvisions &&
        Object.entries(miscProvisions).map(([key, value]) => {
          const items = [];

          if (value?.synopsis?.value)
            items.push(normalizeValue(value.synopsis.value));

          if (value?.keyParameters?.value)
            items.push(normalizeValue(value.keyParameters.value));

          if (value?.narrative?.value)
            items.push(normalizeValue(value.narrative.value));

          if (value?.definition?.value)
            items.push(normalizeValue(value.definition.value));

          if (value?.billingTimeline?.value)
            items.push(normalizeValue(value.billingTimeline.value));

          if (value?.formulas?.value)
            items.push(normalizeValue(value.formulas.value));

          if (value?.capitalRules?.value)
            items.push(normalizeValue(value.capitalRules.value));

          if (!items.length) return null;

          const title = formatProvisionTitle(key);

          return (
            <section className="card provision-card" key={key}>
              <div className="provision-header">
                <h4>{title}</h4>

                <div className="provision-actions">
                  <button className="text-btn" onClick={onAddItem}>
                    + Add Item
                  </button>

                  <FiEdit
                    className="icon edit"
                    onClick={() => onEditCategory(title)}
                  />

                  <FiTrash2 className="icon delete" />
                </div>
              </div>

                 <ul className="provision-list">
                {items.map((item, idx) => (
                  <li className="provision-item" key={idx}>
                    {item}
                    <span className="item-actions">
                      <FiEdit />
                      <FiTrash2 />
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
    </div>
  );
};

export default ProvisionsTab;

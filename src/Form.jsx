export default function Form({metrics}) {
  // Generate dropdown options from metrics data
  const generateOptions = () => {
    return metrics.map((metric) => (
      <option key={metric.name} value={metric.name}>
        {metric.name}
      </option>
    ));
  };

  return (
    <div className="add-form-container">
      <form aria-label="Add new sales deal" aria-describedby="form-description">
        <div id="form-description" className="sr-only">
          Use this form to add a new sales deal. Select a sales rep and enter
          the amount.
        </div>
        {/* Deal name selector */}
        <label htmlFor="deal-name">
          Name:
          <select
            id="deal-name"
            name="name"
            defaultValue={metrics?.[0]?.name || ""} // Use first metric as default
            aria-required="true"
            // aria-invalid=
            // disabled=
          >
            {generateOptions()}
          </select>
        </label>

        {/* Deal amount input */}
        <label htmlFor="deal-value">
          Amount : $
          <input
            id="deal-value"
            name="value"
            defaultValue={0} // Start at $0
            className="amount-input"
            min="0" // No negative amounts
            step="10" // Increment by $10
            aria-required="true"
            // aria-invalid=
            aria-label="Deal amount in dollars"
            // disabled=
          />
        </label>

        {/* Submit button */}
        <button
          type="submit"
          //    disabled=
          // aria-busy=
        >
          Add Deal
          {/*'Adding deal' when pending*/}
        </button>
      </form>
    </div>
  );
}

# Project History

## 2025-11-10

### `supabase-client.js`

- Created Supabase client with env variables

```javascript
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
```

_Note: Vite requires VITE\_ prefix for client-side env vars_

### `index.html`

- Linked stylesheet in head

```html
<link rel="stylesheet" href="/src/index.css" />
```

### `Dashboard.jsx`

- Fetched sales data from Supabase on mount

```javascript
const { data, error } = await supabase
  .from("sales_deals")
  .select(`name,value.sum()`);
```

_Note: Queries sales_deals table and aggregates value column_

- Added state to store fetched data

```javascript
const [metrics, setMetrics] = useState([]);
setMetrics(data); // Store response in state
```

- Wrapped fetch in try-catch for error handling

```javascript
try {
  const {data, error} = await supabase...
  if (error) throw error
  setMetrics(data)
} catch(error) {
  console.error("Error fetching metrics:", error)
}
```

- Fixed syntax error: removed extra `}` braces and corrected variable name from `response` to `data`

- Transformed metrics data for chart visualization

```javascript
const chartData = [
  {
    data: metrics.map((metric) => ({
      primary: metric.name, // X-axis categories
      secondary: metric.value, // Y-axis values
    })),
  },
];
```

_Note: Converts Supabase response into react-charts format_

- Configured chart axes with inline comments

```javascript
const primaryAxis = {
  getValue: (d) => d.primary, // Extract category names
  scaleType: "band", // Bar spacing
  padding: 0.2, // 20% spacing between bars
  position: "bottom",
};

const secondaryAxes = [
  {
    getValue: (d) => d.secondary, // Extract numeric values
    scaleType: "linear", // Continuous scale
    min: 0,
    max: y_max(), // Dynamic max with buffer
  },
];
```

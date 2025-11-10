import supabase from "../supabase-client";
import { useEffect, useState } from "react";
import { Chart } from "react-charts";

export default function Dashboard() {
  // Fetch metrics on component first mount
  //    ! storing data coming from fetch request in state variable
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    fetchMetrics();
  }, []);

  async function fetchMetrics() {
    // ! fetches from --> Query sales_deals table from supabase project
    //  and returns sum(total) the value column

    // todo put this fetches under error handling states with try catch block

    try {
      const { data, error } = await supabase
        .from("sales_deals")
        .select(`name,value.sum() `);

      // ? caught an error --> throw it
      if (error) {
        throw error;
      }
      // ? update metrics --> store data coming from fetch req (supabase)
      setMetrics(data);
      console.log(data); // Log response for debugging
    } catch (error) {
      console.error("Error fetching metrics:", error);
    }
  }

  // todo: Chart handeling
  // ! Transform Supabase data into chart-compatible format that we want as primary for name and secondary for value
  const chartData = [
    {
      data: metrics.map((metric) => ({
        primary: metric.name, // Map name field to primary (X-axis)
        secondary: metric.sum, // Map value field to secondary (Y-axis)
      })),
    },
  ];
  const primaryAxis = {
    getValue: (d) => d.primary, // Extract category names for X-axis
    scaleType: "band", // Use band scale for categorical data (bar spacing)
    padding: 0.2, // 20% spacing between bars
    position: "bottom", // Place axis at bottom of chart
  };

  const secondaryAxes = [
    {
      getValue: (d) => d.secondary, // Extract numeric values for Y-axis
      scaleType: "linear", // Use linear scale for continuous numeric data
      min: 0, // Start Y-axis at zero
      max: y_max(), // Dynamic max value with buffer
      padding: {
        top: 20, // Space above chart
        bottom: 40, // Space below chart for labels
      },
    },
  ];

  function y_max() {
    if (metrics.length > 0) {
      const maxSum = Math.max(...metrics.map((m) => m.sum)); // Find highest value
      return maxSum + 2000; // Add buffer above tallest bar
    }
    return 5000; // fallback max if no data
  }
  return (
    <div className="dashboard-wrapper">
      <div className="chart-container">
        <h2>Total Sales This Quarter ($)</h2>
        <div style={{ flex: 1 }}>
          <Chart
            options={{
              data: chartData,
              primaryAxis,
              secondaryAxes,
              type: "bar",
              defaultColors: ["#58d675"],
              tooltip: {
                show: false,
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

import React from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function CustomBarChart({ data }) {
  return (
    <div style={{ width: "80%", margin: "0 auto" }}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 30,
            bottom: 80,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" angle={-30} textAnchor="end" />

          <YAxis />
          <Tooltip />
          <Legend />

          <Line type="monotone" dataKey="amount" fill="#000000" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CustomBarChart;

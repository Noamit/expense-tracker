import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

function CategoryPieChart({ data }) {
  const RADIAN = Math.PI / 180;
  const initialColors = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff8042",
    "#d084ff",
    "#84d8ff",
  ];

  const [colors, setColors] = useState(initialColors);

  useEffect(() => {
    if (data.length > initialColors.length) {
      const additionalColors = generateColors(
        data.length - initialColors.length
      );
      setColors([...initialColors, ...additionalColors]); // Concatenate initial and generated colors
    }
  }, [data.length]);

  // Function to generate distinct colors for additional categories
  const generateColors = (numColors) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const hue = (i * 360) / numColors; // Distribute hues evenly
      colors.push(`hsl(${hue}, 70%, 50%)`); // Adjust saturation and lightness as needed
    }
    return colors;
  };

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {/* Title above the chart */}
      <h3>Total Expenses by Category</h3>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      {/* Custom Legend Below the Pie Chart */}
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        {data.map((entry, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: "15px",
            }}
          >
            <div
              style={{
                width: "20px",
                height: "20px",
                backgroundColor: colors[index % colors.length],
                marginRight: "5px",
              }}
            ></div>
            <span>{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryPieChart;

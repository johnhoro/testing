import React, { useEffect, useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { Label, Segment } from "semantic-ui-react";
import { LABEL_TRANSLATIONS } from "../../utils/constants";

const COLORS = [
  "#EC8639",
  "#B53233",
  "#141920",
  "#D83276",
  "#5286ED",
  "#58A35B",
];

const allPaymentsData = [
  { name: "Paratha Box", value: 1.7 },
  { name: "Canteen Central", value: 1.9 },
  { name: "Aligarh House", value: 8 },
  { name: "Home Plate", value: 8.2 },
  { name: "Great Indian Khicten", value: 21 },
  { name: "Eat Fit", value: 57.7 },
];

const settledData = [
  { name: "Swiggy", value: 44 },
  { name: "Zomato", value: 18 },
  { name: "Amazon", value: 9 },
  { name: "EatFit", value: 29 },
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
  payload,
  ...rest
}) => {
  console.log(
    "nice",
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    payload,
    rest
  );
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <foreignObject x={x - 30} y={y - 30} width={100} height={100}>
      <p
        xmlns="http://www.w3.org/1999/xhtml"
        style={{
          color: "white",
          fontWeight: "bold",
          textShadow: "#000 1px 0 3px",
        }}
      >{`${LABEL_TRANSLATIONS(payload.name)} ${(percent * 100).toFixed(
        0
      )}%`}</p>
    </foreignObject>
  );
};
const PieChartWidgetBetel = ({ title, type }) => {
  const data = type === "all" ? allPaymentsData : settledData;
  return (
    <>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy={"50%"}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={"85%"}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </>
  );
};

export default PieChartWidgetBetel;

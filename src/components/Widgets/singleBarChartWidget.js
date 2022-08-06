import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Label, Segment } from "semantic-ui-react";

const data = [
  {
    payment: 6,
    Text: "T+1 Day",
    color: "#5e93ce",
  },
  {
    payment: 12,
    Text: "T+2 Day",
    color: "#5e93ce",
  },
  {
    payment: 4,
    Text: "T+3 Day",
    color: "#5e93ce",
  },
  {
    payment: 2,
    Text: "more than T+3 Day",
    color: "#5e93ce",
  },
];

const SingleBarChartWidget = ({title}) => {
  return (
    <Segment style={{ width: "100%", height: "400px" }}>
      <Label attached="top">{title}</Label>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={400}
          height={400}
          data={data}
          margin={{ top: 25, right: 0, left: 0, bottom: 25 }}
        >
          <XAxis dataKey="Text" tickSize stroke="#5f5f5f" dy={5} />
          <YAxis hide />
          <Tooltip />
          <Bar dataKey="payment" barSize={50}>
            {data.map((entry, index) => (
              <Cell fill={data[index].color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Segment>
  );
}

export default SingleBarChartWidget;

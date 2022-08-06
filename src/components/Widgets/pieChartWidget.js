import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { Dimmer, Label, Loader, Segment } from "semantic-ui-react";
import { LABEL_TRANSLATIONS } from "../../utils/constants";

const COLORS = ["#5e93ce", "#de8244"];

const DEMOCOLORS = ["#87cefa", "#ff9900"];

const allPaymentsData = [
  { name: "Captured", value: 155 },
  { name: "Failed", value: 98 },
];

const settledData = [
  { name: "Settled", value: 128 },
  { name: "Not Settled Yet", value: 1 },
  { name: "Pending", value: 1 },
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
  // console.log(
  //   "nice",
  //   cx,
  //   cy,
  //   midAngle,
  //   innerRadius,
  //   outerRadius,
  //   payload,
  //   rest
  // );
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
const PieChartWidget = ({ title, type, data: dataID, className, color }) => {
  console.log(dataID, "id");
  const responseData = useSelector((state) =>
    dataID.map((v) => state.queryData.response[v])
  );
  console.log(responseData, "response");
  // const [data,setData]=useState(null)
  // useEffect(()=>{
  //   console.log('here')
  //   if(!responseData.some(e=>e===undefined)){

  //   setData(responseData.flatMap(e=>e.schema.fields.flatMap(x=>x.name=='index'?[]:({value:e.data[0][x.name],name:x.name}))))
  // }else{
  //     setData(null)
  //   }
  // },[responseData])
  return (
    <Segment
      className={`${className || ""}`}
      style={{ width: "100%", height: "400px" }}
    >
      <Label attached="top">{title}</Label>
      {responseData.some((e) => e === undefined) ? (
        <Dimmer active inverted>
          <Loader inverted />
        </Dimmer>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={400}>
            {/* <Legend verticalAlign="top" height={5} iconType="square" layout="vertical" align="right" iconSize={10}/> */}
            <Pie
              isAnimationActive={false}
              data={responseData.flatMap((e) =>
                e.schema.fields.flatMap((x) =>
                  x.name == "index"
                    ? []
                    : [{ value: e.data[0][x.name], name: x.name }]
                )
              )}
              cx="50%"
              cy={"50%"}
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={"85%"}
              fill="#8884d8"
              dataKey="value"
            >
              {responseData
                .flatMap((e) =>
                  e.schema.fields.flatMap((x) =>
                    x.name == "index"
                      ? []
                      : [{ value: e.data[0][x.name], name: x.name }]
                  )
                )
                .map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      color
                        ? DEMOCOLORS[index % COLORS.length]
                        : COLORS[index % COLORS.length]
                    }
                  />
                ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      )}
    </Segment>
  );
};

export default PieChartWidget;

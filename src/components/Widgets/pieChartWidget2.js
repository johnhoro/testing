import React, { useEffect, useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { Label, Segment } from "semantic-ui-react";
import {
  LABEL_TRANSLATIONS,
  mosaicTestTenants,
  TENANTS,
} from "../../utils/constants";
import { useSelector, useDispatch } from "react-redux";
import { getQueryConfig } from "../../container/ApplicationsCache";
import { getQueryDataAction } from "../../actions/queryDataActions";

const COLORS = ["#DF8244", "#4C73BE", "#141920"];

const allPaymentsData = [
  { name: "Bodywise", value: 29 },
  { name: "Man Matters", value: 58 },
  { name: "Little Joy", value: 13 },
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
      >{`${LABEL_TRANSLATIONS(payload.item_type_brand)} ${(
        percent * 100
      ).toFixed(0)}%`}</p>
    </foreignObject>
  );
};
const PieChartWidget2 = ({ title, type, dataID, subDomain }) => {
  const responseData = useSelector((state) => state.queryData.response[dataID]);
  // const responseData = useSelector((state) =>
  //   dataID?.map((v) => state.queryData.response[v])
  // );
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.queryData.filter);
  const text_search = filter.text_search;
  const startDate = filter.startDate.toISOString();
  const endDate = filter.endDate.toISOString();
  // const responseData = useSelector((state) =>
  //   dataID?.map((v) => state.queryData.response[v])
  // );

  useEffect(() => {
    if (!responseData) {
      const config = getQueryConfig(dataID);
      const effective_filter = {
        ...config.filter,
        startDate,
        endDate,
        text_search,
      };
      if (mosaicTestTenants.includes(TENANTS(subDomain))) {
        dispatch(
          getQueryDataAction(dataID, {
            ...config,
            filter: effective_filter,
            whereClause:
              Object.values(
                { value: filter.whereClause.is_channel } || {}
              ).join(` `) +
              " " +
              (config.whereClause || {}),
          })
        );
      } else {
        dispatch(
          getQueryDataAction(dataID, { ...config, filter: effective_filter })
        );
      }
    }
  }, [filter]);
  //   const data = type === "all" ? allPaymentsData : settledData;
  const data = responseData?.data;
  return (
    // <Segment style={{ width: "100%", height: "400px" }}>
    //   <Label attached="top">{title}</Label>
    <ResponsiveContainer width="100%">
      <PieChart width={400} height={400}>
        {/* <Legend verticalAlign="top" height={5} iconType="square" layout="vertical" align="right" iconSize={10}/> */}
        <Pie
          data={data}
          cx="50%"
          cy={"50%"}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={"85%"}
          fill="#8884d8"
          dataKey="total_count"
        >
          {data?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
    // </Segment>
  );
};

export default PieChartWidget2;
